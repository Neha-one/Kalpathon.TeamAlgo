import express from "express";
import { protect } from "../middleware/protect.js";
import { bioUpdate, checkAuth, getAllUser, getMe, getUserByCustomId } from "../controller/userConroller.js";
import { uploadProfile } from "../config/cloudinary.js";
const router = express.Router();


router.get('/getallUser', getAllUser);
router.get("/checkauth", protect, checkAuth);

router.get("/userprofile/:customId", getUserByCustomId);

router.put(
  "/bioupdate/:userIdFromParams",
  protect,
  (req, res, next) => {
    uploadProfile.single("profilePicture")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return response(
            res,
            400,
            "Bhai, ek baar mein sirf ek hi photo daal sakte ho ! 🛑",
          );
        }
        if (err.code === "LIMIT_FILE_SIZE") {
          return response(
            res,
            400,
            "Bhai, photo 3MB se badi hai! Thodi choti photo daal. 📉",
          );
        }
        return response(res, 400, err.message);
      }
      next();
    });
}, bioUpdate);
router.get("/me", protect, getMe);
export default router;