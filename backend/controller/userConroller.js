import response from "../utils/responseHandle.js";
import User from '../model/userModel.js'
export const getAllUser = async (req, res) => {
    try {
        const myId = req.user?._id;
        const users = await User.find({ _id: { $ne: myId } })
            .select("customId username profilePicture email userProfession gender phoneNumber")
            .limit(20);

        return response(res, 200, "Users fetched successfully", { users });
    } catch (error) {
        return response(res, 500, "Server error", null, error.message);
    }
};
export const checkAuth = async (req, res) => {
  const userId = req.user?._id;
  try {
    if (!userId) {
      return response(
        res,
        401,
        "Unauthorized ! Please login to access HotDrop",
      );
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return response(res, 404, "User not found with this session");
    }
    return response(res, 200, "User authenticated successfully", { user });
  } catch (error) {
    return response(res, 500, "Server error", null, error.message);
  }
};
export const getUserByCustomId = async (req, res) => {
  const { customId } = req.params;

  const loggedInUserId = req.user?._id;
  try {
    const user = await User.findOne({ customId }).select("-password");
    if (!user || user.length === 0) {
      return response(res, 404, "User not found with this customId");
    }
    const isOwner = loggedInUserId
      ? loggedInUserId.toString() === user._id.toString()
      : false;
    return response(res, 200, "User profile fetched successfully", {
      user,
      isOwner,
    });
  } catch (error) {
    return response(res, 500, "Server error", null, error.message);
  }
};

export const bioUpdate = async (req, res) => {
  const loggedInUserId = req.user._id.toString();
  const { userIdFromParams } = req.params;
  console.log("--- DEBUG START ---");
  console.log("1. Params ID:", userIdFromParams); // Check if this matches your route :id
  console.log("2. Logged In User ID:", req.user?._id);
  if (userIdFromParams && loggedInUserId !== userIdFromParams) {
    return response(res, 403, "You'r not Owner 🛑");
  }

  try {
    const user = await User.findById(loggedInUserId);
    if (!user) return response(res, 404, "User not found!");
    const updateData = {
      bio: req.body.bio,
      username: req.body.username,
      customId: req.body.customId,
      priceRange: req.body.priceRange,
      dateOfBirth: req.body.dateOfBirth,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      ability: req.body.ability,
    };
    if (req.body.customId) {
      const existingUser = await User.findOne({
        customId: req.body.customId,
        _id: { $ne: loggedInUserId },
      });
      if (existingUser) {
        return response(res, 400, " customId already taken! 😕");
      }
    }

    if (req.file) {
      if (user.profilePicture) {
        try {
          const urlParts = user.profilePicture.split("/");
          const fileNameWithExt = urlParts.pop();
          const publicId = fileNameWithExt.split(".")[0];
          const folderName = urlParts.pop();

          const fullPublicId = `${folderName}/${publicId}`;

          console.log("🔥 Deleting old image:", fullPublicId);
          await cloudinary.uploader.destroy(fullPublicId);
        } catch (err) {
          console.error("Cloudinary Delete Error:", err.message);
        }
      }

      updateData.profilePicture = req.file.path;
    }
    const updatedUser = await User.findByIdAndUpdate(
      loggedInUserId,
      { $set: updateData },
      { returnDocument: "after", runValidators: true },
    ).select("-password");
console.log("🔥updated")
    return response(res, 200, "Profile updated successfully! ✨", updatedUser);
  } catch (error) {
    return response(res, 500, "Update failed", null, error.message);
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("followers", "username customId profilePicture")
      .populate("following", "username customId profilePicture")
      .populate({
        path: "posts",
        options: { sort: { createdAt: -1 } }, 
        populate: [{
          path: "comments.user", 
          select: "customId profilePicture"
        },{ path: "likes", select: "customId profilePicture" }]
      });
    

    if (!user) {
      return response(res, 404, "User not found");
    }

    return response(res, 200, "User data fetched", { user });
  } catch (error) {
    return response(res, 500, "Server error", null, error.message);
  }
};