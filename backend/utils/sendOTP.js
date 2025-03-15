import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail", // ✅ Change this to "gmail" for Gmail
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ✅ Function to send OTP
const sendOTP = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It will expire in 5 minutes.`
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: "OTP sent successfully!" };
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { success: false, message: "Failed to send OTP." };
    }
};

// ✅ Fix export statement
export { sendOTP };
