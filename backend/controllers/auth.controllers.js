import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import genToken from "../utils/token.js";
import { sendOtpMail, sendVerifyEmail } from "../utils/mail.js";

/* COOKIE OPTIONS */
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

/*SIGN UP (EMAIL VERIFICATION)*/
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    if (!fullName || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (mobile.length < 10) {
      return res.status(400).json({ message: "Mobile number must be at least 10 digits" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔐 Email verification token
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const hashedVerifyToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");

    const user = await User.create({
      fullName,
      email,
      mobile,
      role: role || "user",
      password: hashedPassword,
      isEmailVerified: false,
      emailVerifyToken: hashedVerifyToken,
      emailVerifyExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    // 📧 Send verification email
    const verifyUrl = `https://hostel-hungry-0.onrender.com/verify-email?token=${verifyToken}`;
    await sendVerifyEmail(email, verifyUrl);

    return res.status(201).json({
      message: "Signup successful. Please verify your email."
    });
  } catch (error) {
    console.error("SignUp Error:", error);
    return res.status(500).json({ message: "Signup failed" });
  }
};

/* ================= VERIFY EMAIL ================= */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      emailVerifyToken: hashedToken,
      emailVerifyExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification link" });
    }

    user.isEmailVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyExpires = undefined;

    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Email verification failed" });
  }
};

/* ================= SIGN IN ================= */
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Please verify your email before login"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, cookieOptions);

    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json(userData);
  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({ message: "Signin failed" });
  }
};

/* ================= SIGN OUT ================= */
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch {
    return res.status(500).json({ message: "Logout failed" });
  }
};

/* ================= SEND OTP (PASSWORD RESET) ================= */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Valid email required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user.otpExpires && user.otpExpires > Date.now() - 4 * 60 * 1000) {
      return res.status(429).json({ message: "OTP already sent. Please wait." });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    user.resetOtp = hashedOtp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();
    await sendOtpMail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("SendOtp Error:", error.message);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* ================= VERIFY OTP ================= */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.resetOtp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    if (hashedOtp !== user.resetOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch {
    return res.status(500).json({ message: "OTP verification failed" });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification required" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.isOtpVerified = false;

    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch {
    return res.status(500).json({ message: "Password reset failed" });
  }
};

/* ================= GOOGLE AUTH ================= */
export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        fullName,
        email,
        mobile: mobile || null,
        role: role || "user",
        password: hashedPassword,
        isEmailVerified: true // Google emails are trusted
      });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, cookieOptions);

    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json(userData);
  } catch (error) {
    console.error("GoogleAuth Error:", error);
    return res.status(500).json({ message: "Google authentication failed" });
  }
};

