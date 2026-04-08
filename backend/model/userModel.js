import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
      select: false,
    },

    userProfession: {
      type: String,
      enum: ["worker", "customer"],
      required: true,
      default: null
    },



    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
    },
    token: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpire: {
      type: Date,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },

    profilePicture: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      default: null
    },

  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
