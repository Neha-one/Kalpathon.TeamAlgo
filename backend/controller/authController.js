import response from "../utils/responseHandle.js";
import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/tokenGenrate.js";
import { emailVerify } from "../emailVerify/emailVerify.js";

export const registerUser = async (req, res) => {
  try {
    const { customId,userProfession ,username, email, password, gender, dateOfBirth } =
      req.body;

    if (!email || !customId || !username || !userProfession) {
      return response(res, 400, "Required fields are missing");
    }

    const normalizedEmail = email.toLowerCase();
    const normalizedId = customId.toLowerCase();

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { customId: normalizedId }],
    });

    if (existingUser) {
      const isEmailMatch = existingUser.email.toLowerCase() === normalizedEmail;
      const message = isEmailMatch
        ? "Email already registered"
        : "CustomId is already taken";
      return response(res, 400, message);
    }

    if (!password) {
      return response(res, 400, "Password is required");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      customId: normalizedId,
      email: normalizedEmail,
      password: hashedPassword,
      gender,
      dateOfBirth,
      username,
      userProfession
    });

    const VerificationToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "60m",
      },
    );

    newUser.token = VerificationToken;
  

    let emailSent = true;
    try {
      await emailVerify(VerificationToken, normalizedEmail);
    } catch (mailError) {
      emailSent = false;
      console.error("Verification mail error:", mailError.message);
    }

    const accessToken = generateToken(newUser);

    res.cookie("auth_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
  await newUser.save();
    return response(
      res,
      201,
      emailSent
        ? "User Created Successfully"
        : "User created, but verification email could not be sent. Please use resend verification.",
      {
      userId: newUser._id,
      username: newUser.username,
      VerificationToken: VerificationToken,
      customId: newUser.customId,
      emailSent,
      },
    );
  } catch (error) {
    console.log(error);
    console.error("🔥 Registration Error Detail:", error);
    return response(res, 500, "Internal server error", null, error.message);
  }
};