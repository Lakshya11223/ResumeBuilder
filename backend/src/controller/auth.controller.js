import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import generateToken from "../utils/token.js";
import User from "../models/user.models.js";

const generateotp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


const registeruser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists pls login" });
    }

    const hashedpass = await bcrypt.hash(password, 10);
    console.log("hashedPass->",hashedpass)
    const otp = generateotp();
    const otpexpire = Date.now() + 10 * 60 * 1000; // 10 min
    console.log(otp);
    const newuser = await User.create({
      name,
      email,
      password: hashedpass,
      otp,
      otpexpire,
      isverified: false,
    });
    console.log(newuser);
    const token = generateToken(newuser._id, res);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3 * 24 * 60 * 60 * 1000,
});

// 

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

try {
  await transporter.verify();
  console.log("SMTP Connected Successfully");
} catch (err) {
  console.error("SMTP Verify Failed:", err);
  return res.status(500).json({
    message: "SMTP connection failed",
    error: err,
  });
}

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Verify Your Email",
  html: `
    <h2>Email Verification</h2>
    <p>Your OTP is:</p>
    <h1>${otp}</h1>
    <p>This OTP is valid for 10 minutes.</p>
  `,
};

try {
  const info = await transporter.sendMail(mailOptions);
  console.log(" Email sent:", info.response);
} catch (err) {
  console.error("Email Send Failed:", err);
  return res.status(500).json({
    message: "Failed to send OTP email",
    error: err,
  });
}

    res.status(201).json({
      message: "User created successfully. OTP sent to email.",
      User: {
        id: newuser._id,
        name,
        email,
        token,
        otp
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "User not registered, server error",
      error: error,
    });
  }
};


const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user._id; // make sure req.user is set by auth middleware

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.otp || user.otp !== otp || user.otpexpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid/expired OTP.",
      });
    }

    user.isverified = true;
    user.otp = undefined;
    user.otpexpire = undefined;
    await user.save();

    return res.status(200).json({ message: "You are verified" });
  } catch (error) {
    console.log("Otp verification error", error);
    return res.status(500).json({
      message: "Server error during OTP verification",
      error: error,
    });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(401).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User is not registered" });
    }

    const ispasswordcorrect = await bcrypt.compare(password, user.password);
    if (!ispasswordcorrect) {
      return res.status(400).json({ message: "Password is invalid" });
    }

    if (!user.isverified) {
      return res.status(400).json({ message: "You are not verified" });
    }

    const token = generateToken(user._id, res);
    console.log("User login successfully");

    return res.status(200).json({
      message: "You have logged in",
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log("--------Error in login--------", error);
    res.status(500).json({
      message: "You are not logged in, internal server error",
    });
  }
};


const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    console.log("Logout successfully");
    return res.status(200).json({ message: "You are successfully logged out" });
  } catch (error) {
    console.log("Logout error", error);
    return res.status(500).json({ message: "Error in logging out", error });
  }
};
const check_auth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    return res.status(200).json(req.user);
  } catch (err) {
    return res.status(400).json({ message: "User is not authenticated", err });
  }
};

export { registeruser, login, verifyOtp, logout,check_auth };
