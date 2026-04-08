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