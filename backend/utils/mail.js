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


















// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// export const sendOtpMail = async (to, otp) => {
//   try {
//     const response = await axios.post(
//       BREVO_API_URL,
//       {
//         sender: { email: process.env.EMAIL_SENDER, name: "Hostel Hungry" },
//         to: [{ email: to }],
//         subject: "Reset Your Password - Hostel Hungry",
//         htmlContent: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
//             <h2 style="color: #ff4d2d; text-align: center;">Hostel Hungry</h2>
//             <p>Hello,</p>
//             <p>Your OTP for password reset is:</p>
//             <div style="font-size: 24px; font-weight: bold; text-align:center; padding: 10px; background:#f4f4f4;">
//               ${otp}
//             </div>
//             <p>Valid for 5 minutes.</p>
//           </div>
//         `,
//       },
//       {
//         headers: {
//           "api-key": process.env.BREVO_API_KEY,
//           "Content-Type": "application/json",
//           accept: "application/json",
//         },
//       }
//     );

//     console.log("Password reset OTP sent via Brevo API:", to);
//     return true;
//   } catch (error) {
//     console.error("Brevo API Email Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export const sendDeliveryOtpMail = async (user, otp) => {
//   try {
//     const response = await axios.post(
//       BREVO_API_URL,
//       {
//         sender: { email: process.env.EMAIL_SENDER, name: "Hostel Hungry" },
//         to: [{ email: user.email }],
//         subject: "Delivery OTP - Hostel Hungry",
//         htmlContent: `
//           <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
//             <h2 style="color: #ff4d2d;">Delivery OTP</h2>
//             <p>Hello ${user.fullName},</p>
//             <p>Your OTP for delivery is:</p>
//             <div style="font-size: 24px; font-weight: bold; text-align:center; padding: 10px; background:#f4f4f4;">
//               ${otp}
//             </div>
//             <p>Valid for 5 minutes.</p>
//           </div>
//         `,
//       },
//       {
//         headers: {
//           "api-key": process.env.BREVO_API_KEY,
//           "Content-Type": "application/json",
//           accept: "application/json",
//         },
//       }
//     );

//     console.log("Delivery OTP sent via Brevo API:", user.email);
//     return true;
//   } catch (error) {
//     console.error("Brevo API Delivery Email Error:", error.response?.data || error.message);
//     throw error;
//   }
// };



// import nodemailer from "nodemailer"
// import dotenv from "dotenv"
// dotenv.config()
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   port: 465,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });

// export const sendOtpMail=async (to,otp) => {
//     await transporter.sendMail({
//         from:process.env.EMAIL,
//         to,
//         subject:"Reset Your Password",
//         html:`<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
//     })
// }


// export const sendDeliveryOtpMail=async (user,otp) => {
//     await transporter.sendMail({
//         from:process.env.EMAIL,
//         to:user.email,
//         subject:"Delivery OTP",
//         html:`<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
//     })
// }
// import nodemailer from "nodemailer";

// // Function to create the transporter (Points to Brevo)
// const getTransporter = () => {
//     return nodemailer.createTransport({
//         host: "smtp-relay.brevo.com",
//         port: 587,
//         secure: false, // Port 587 uses STARTTLS
//         auth: {
//             user: process.env.EMAIL, // Your verified Brevo sender email
//             pass: process.env.PASS,  // Your Brevo SMTP Key (Long string)
//         },
//         connectionTimeout: 10000, 
//     });
// };

// export const sendOtpMail = async (to, otp) => {
//     try {
//         const transporter = getTransporter();

//         await transporter.sendMail({
//             from: `"Hostel Hungry" <${process.env.EMAIL}>`,
//             to: to,
//             subject: "Reset Your Password - Hostel Hungry",
//             html: `
//                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
//                     <h2 style="color: #ff4d2d; text-align: center;">Hostel Hungry</h2>
//                     <p>Hello,</p>
//                     <p>You requested a password reset. Please use the following One-Time Password (OTP) to proceed:</p>
//                     <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333;">
//                         ${otp}
//                     </div>
//                     <p>This code is valid for <b>5 minutes</b>. If you did not request this, please ignore this email.</p>
//                     <hr style="border: none; border-top: 1px solid #eee;" />
//                     <p style="font-size: 12px; color: #888; text-align: center;">Vingo Food Delivery Service</p>
//                 </div>
//             `
//         });

//         console.log("Password Reset OTP sent successfully to:", to);
//         return true;
//     } catch (error) {
//         console.error("Brevo OTP Error:", error.message);
//         throw new Error("Email service failed");
//     }
// };

// export const sendDeliveryOtpMail = async (user, otp) => {
//     try {
//         const transporter = getTransporter();

//         await transporter.sendMail({
//             from: `"Hostel Hungry" <${process.env.EMAIL}>`,
//             to: user.email,
//             subject: "Delivery OTP - Hostel Hungry",
//             html: `
//                 <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
//                     <h2 style="color: #ff4d2d;">Delivery Confirmation</h2>
//                     <p>Your OTP for delivery is: <b style="font-size: 20px;">${otp}</b></p>
//                     <p>Please share this only with the delivery partner once you receive your order.</p>
//                 </div>
//             `
//         });
        
//         console.log("Delivery OTP sent successfully to:", user.email);
//     } catch (error) {
//         console.error("Delivery Mail Error:", error.message);
//         throw error;
//     }
// };


