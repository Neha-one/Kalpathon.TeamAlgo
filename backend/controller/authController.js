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
export const Verification = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return response(res, 400, "Token is missing");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      const msg =
        error.name === "TokenExpiredError" ? "Link expired" : "Invalid token";
      return response(res, 400, msg);
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return response(res, 404, "User not found");
    }

    if (user.token !== token) {
      return response(
        res,
        400,
        "This link is no longer valid or has been used",
      );
    }

    user.isVerified = true;
    user.token = null;
    await user.save();

    return response(
      res,
      200,
      "Email verified successfully! You can now login.",
    );
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error", null, error.message);
  }
};
export const reVerificationMail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return response(res, 400, "Email is required");
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return response(res, 404, "User not found");
    }

    if (user.isVerified) {
      return response(res, 400, "User already verified. Please login.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    user.token = token;
    await user.save();

    await emailVerify(token, user.email);

    return response(res, 200, "Verification email sent successfully");
  } catch (error) {
    console.error("Re-verification error:", error.message);
    return response(res, 500, "Internal server error", null, error.message);
  }
};
export const login = async (req, res) => {
  try {
    const { customId, email, password } = req.body;

    if ((!email && !customId) || !password) {
      return response(res, 400, "Required fields are missing");
    }

    const normalizedEmail = email ? email.toLowerCase() : null;
    const normalizedId = customId ? customId.toLowerCase() : null;

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { customId: normalizedId }].filter(
        Boolean,
      ),
    }).select("+password")
    

    if (!existingUser) {
      return response(res, 400, "User not found");
    }
    if (!existingUser.isVerified) {
      return response(res, 400, "User not Verified");
    }
    const matchPassword = await bcryptjs.compare(
      password,
      existingUser.password,
    );

    if (!matchPassword) {
      return response(res, 400, "Invalid email or password");
    }

    const accessToken = generateToken(existingUser);
    const user = await User.findOneAndUpdate(
      { _id: existingUser._id },
      { $set: { isLoggedIn: true } },
      { 
        returnDocument: "after",
        runValidators: true 
      }
    )
 
   
    res.cookie("auth_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
   

    return response(res, 200, `Welcome Mr ${user.username}`, {
      userId: user._id,
      username: user.username,
      customId: user.customId,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal server error", null, error.message);
  }
};
export const logout = async (req, res) => {
  try {
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { isLoggedIn: false });
    }

    res.clearCookie("auth_token", {
      httpOnly: true,
 secure: true,
      sameSite: "none",
    });

    return response(res, 200, "Logout Successfully and status updated in DB");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal server error");
  }
};