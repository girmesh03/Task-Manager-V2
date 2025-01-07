import asyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.js";
import User from "../models/UserModel.js";

// @desc Get users
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res, next) => {});

// @desc Get user
// @route GET /api/users/:userId
// @access Private
const getUser = asyncHandler(async (req, res, next) => {});

export { getUsers, getUser };
