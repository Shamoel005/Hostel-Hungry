import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

/* ================= COMMON SENDER UTILS ================= */
const getSenderConfig = () => {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("Missing BREVO_API_KEY in environment");
  }

  const senderEmail =
    process.env.EMAIL_SENDER && process.env.EMAIL_SENDER.includes("@")
      ? process.env.EMAIL_SENDER
      : process.env.EMAIL_USER;

  if (!senderEmail) {
    throw new Error(
      "Missing sender email. Set EMAIL_SENDER or EMAIL_USER in .env"
    );
  }

  const senderName =
    process.env.EMAIL_SENDER_NAME ||
    (process.env.EMAIL_SENDER &&
    !process.env.EMAIL_SENDER.includes("@")
      ? process.env.EMAIL_SENDER
      : "Hostel Hungry");

  return { senderEmail, senderName };
};

/* ================= PASSWORD RESET OTP ================= */
export const sendOtpMail = async (to, otp) => {
  try {
    const { senderEmail, senderName } = getSenderConfig();

    await axios.post(
      BREVO_API_URL,
      {
        sender: { email: senderEmail, name: senderName },
        to: [{ email: to }],
        subject: "Reset Your Password - Hostel Hungry",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #ff4d2d; text-align: center;">Hostel Hungry</h2>
            <p>Hello,</p>
            <p>Your OTP for password reset is:</p>
            <div style="font-size: 24px; font-weight: bold; text-align:center; padding: 10px; background:#f4f4f4;">
              ${otp}
            </div>
            <p>Valid for 5 minutes.</p>
          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    console.log("Password reset OTP email sent to:", to);
    return true;
  } catch (error) {
    console.error("Brevo OTP Email Error:", error.response?.data || error.message);
    throw error;
  }
};

/* ================= EMAIL VERIFICATION (SIGNUP) ================= */
export const sendVerifyEmail = async (email, verifyUrl) => {
  try {
    const { senderEmail, senderName } = getSenderConfig();

    await axios.post(
      BREVO_API_URL,
      {
        sender: { email: senderEmail, name: senderName },
        to: [{ email }],
        subject: "Verify Your Email - Hostel Hungry",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #ff4d2d; text-align: center;">Hostel Hungry</h2>
            <p>Welcome!</p>
            <p>Please verify your email address by clicking the button below:</p>
            <div style="text-align:center; margin: 20px 0;">
              <a href="${verifyUrl}" 
                 style="background:#ff4d2d; color:white; padding:12px 20px; text-decoration:none; border-radius:5px;">
                Verify Email
              </a>
            </div>
            <p>This link is valid for 24 hours.</p>
            <p>If you did not create this account, please ignore this email.</p>
          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    console.log("Verification email sent to:", email);
    return true;
  } catch (error) {
    console.error(
      "Brevo Verification Email Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/* ================= DELIVERY OTP ================= */
export const sendDeliveryOtpMail = async (user, otp) => {
  try {
    const { senderEmail, senderName } = getSenderConfig();

    await axios.post(
      BREVO_API_URL,
      {
        sender: { email: senderEmail, name: senderName },
        to: [{ email: user.email }],
        subject: "Delivery OTP - Hostel Hungry",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #ff4d2d;">Delivery OTP</h2>
            <p>Hello ${user.fullName},</p>
            <p>Your OTP for delivery is:</p>
            <div style="font-size: 24px; font-weight: bold; text-align:center; padding: 10px; background:#f4f4f4;">
              ${otp}
            </div>
            <p>Valid for 5 minutes.</p>
          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    console.log("Delivery OTP email sent to:", user.email);
    return true;
  } catch (error) {
    console.error(
      "Brevo Delivery OTP Email Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

