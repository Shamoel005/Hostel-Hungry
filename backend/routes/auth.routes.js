import express from "express";
import {
  googleAuth,
  resetPassword,
  sendOtp,
  signIn,
  signOut,
  signUp,
  verifyOtp,
  verifyEmail
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

/* ================= AUTH ================= */
authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);

/* ================= EMAIL VERIFICATION ================= */
authRouter.get("/verify-email", verifyEmail);

/* ================= PASSWORD RESET ================= */
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);

/* ================= GOOGLE AUTH ================= */
authRouter.post("/google-auth", googleAuth);

export default authRouter;
