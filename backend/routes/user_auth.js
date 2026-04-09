import express from "express";
import { protect } from "../middleware/protect.js";
import { getAllUser } from "../controller/userConroller.js";
const router = express.Router();

router.get('/getallUser', getAllUser);
// router.get('/verification/:token', Verification)
// router.post('/reverificationmail', reVerificationMail)
// router.post('/login', login)
// router.post('/logout', protect, logout)


export default router;
