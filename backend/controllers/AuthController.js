import asyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.js";
import User from "../models/UserModel.js";

// @desc Signup
// @route POST /api/auth/signup
// @access Public
const signup = asyncHandler(async (req, res) => {});

// @desc Login
// @route POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {});

export { signup, login };
