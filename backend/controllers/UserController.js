import asyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.js";
import User from "../models/UserModel.js";

// @desc Get users
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
});

// @desc Get user
// @route GET /api/users/:userId
// @access Private
const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  res.status(200).json(user);
});

export { getUsers, getUser };
