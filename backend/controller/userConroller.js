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

