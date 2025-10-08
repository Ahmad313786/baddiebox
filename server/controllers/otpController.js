import nodemailer from "nodemailer";

const otpStore = {}; // temporary memory (for production: use Redis)

// 🔹 SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.json({ success: false, message: "Email required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = {
      otp,
      verified: false,
      expiresAt: Date.now() + 5 * 60 * 1000, // valid for 5 min
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Baddie Box" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Baddie Box Verification Code",
      text: `Your verification code is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// 🔹 VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpStore[email];

    if (!record) return res.json({ success: false, message: "OTP not found" });
    if (record.expiresAt < Date.now()) return res.json({ success: false, message: "OTP expired" });
    if (record.otp !== otp) return res.json({ success: false, message: "Invalid OTP" });

    record.verified = true; // mark verified
    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};

// export for registerUser check
export const isEmailVerified = (email) => {
  const record = otpStore[email];
  return record && record.verified === true;
};
