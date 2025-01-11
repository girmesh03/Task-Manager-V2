import asyncHandler from "express-async-handler";
import crypto from "crypto";
import { validationResult } from "express-validator";
import CustomError from "../utils/CustomError.js";
import User from "../models/UserModel.js";
import { sendVerificationEmail } from "../utils/SendEmail.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/GenerateTokens.js";

// @desc Signup
// @route POST /api/auth/signup
// @access Public
const signup = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, position } = req.body;

  // Validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new CustomError(errors.array()[0].msg, 400));
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new CustomError("User already exists", 400));
  }

  // Generate verification token (with expiration)
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  // Create new user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    position,
    verificationToken: hashedToken,
    verificationTokenExpiry: Date.now() + 3600000, // 1 hour expiration
  });

  if (!newUser) {
    return next(new CustomError("Failed to create user", 400));
  }

  try {
    await sendVerificationEmail(email, verificationToken);
    res.status(201).json({
      message: "User created successfully. Please verify your email",
    });
  } catch (error) {
    await User.findByIdAndDelete(newUser._id);
    return next(
      new CustomError(
        "Failed to send verification email. Please try again",
        500
      )
    );
  }
});

// @desc Verify email
// @route GET /api/auth/verify/:token
// @access Public
const verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  // Check if token is valid
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user with token
  const user = await User.findOne({
    verificationToken: hashedToken,
    verificationTokenExpiry: { $gt: Date.now() },
  });

  // If user not found
  if (!user) {
    return next(new CustomError("Invalid or expired verification token", 400));
  }

  // Update user to verified
  user.isVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpiry = null;
  await user.save();

  // Generate access and refresh tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set cookies
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Prepare response
  const response = await User.findById(user._id);

  // Send response
  res.status(200).json(response);
});

// @desc Login
// @route POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new CustomError(errors.array()[0].msg, 400));
  }

  // Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new CustomError("No account found. Please sign up.", 404));
  } else if (!(await user.matchPassword(password))) {
    return next(new CustomError("Invalid email or password", 403));
  }

  // Check if user is verified
  if (!user.isVerified) {
    return next(new CustomError("Please verify your email", 400));
  }

  // Generate JWT tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set cookies
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Prepare response
  const response = await User.findById(user._id).select("-password");

  // Send response
  res.status(200).json(response);
});

export { signup, verifyEmail, login };
