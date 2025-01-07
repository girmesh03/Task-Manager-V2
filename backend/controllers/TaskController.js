import asyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.js";
import Task from "../models/TaskModel.js";

// @desc Create task
// @route POST /api/tasks
// @access Private
const createTask = asyncHandler(async (req, res, next) => {});

// @desc Get tasks
// @route GET /api/tasks
// @access Private
const getTasks = asyncHandler(async (req, res, next) => {});

// @desc Get task
// @route PUT /api/tasks/:taskId
// @access Private
const getTask = asyncHandler(async (req, res, next) => {});

// @desc Update task
// @route PUT /api/tasks/:taskId
// @access Private
const updateTask = asyncHandler(async (req, res, next) => {});

// @desc Delete task
// @route DELETE /api/tasks/:taskId
// @access Private
const deleteTask = asyncHandler(async (req, res, next) => {});

export { createTask, getTasks, getTask, updateTask, deleteTask };
