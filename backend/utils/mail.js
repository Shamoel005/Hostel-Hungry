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
import nodemailer from "nodemailer";

export const sendOtpMail = async (to, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS, // This MUST be the 16-character App Password (no spaces)
            },
        });

        const info = await transporter.sendMail({
            from: `"Hostel Hungry" <${process.env.EMAIL}>`,
            to: to,
            subject: "Reset Your Password - Hostel Hungry",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                    <h2 style="color: #ff4d2d; text-align: center;">Hostel Hungry</h2>
                    <p>Hello,</p>
                    <p>You requested a password reset. Please use the following One-Time Password (OTP) to proceed:</p>
                    <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333;">
                        ${otp}
                    </div>
                    <p>This code is valid for <b>5 minutes</b>. If you did not request this, please ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #eee;" />
                    <p style="font-size: 12px; color: #888; text-align: center;">Vingo Food Delivery Service</p>
                </div>
            `
        });

        console.log("Email sent successfully: " + info.response);
        return info;
    } catch (error) {
        console.error("Nodemailer Error detected:", error.message);
        throw error; // Re-throw so the controller can catch the 500 error
    }
};

export const sendDeliveryOtpMail = async (user, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: `"Hostel Hungry" <${process.env.EMAIL}>`,
            to: user.email,
            subject: "Delivery OTP - Hostel Hungry",
            html: `<p>Your OTP for delivery is <b>${otp}</b>. Please share this with the delivery partner.</p>`
        });
    } catch (error) {
        console.error("Delivery Mail Error:", error.message);
        throw error;
    }
};
