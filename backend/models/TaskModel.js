import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Pending", "To Do"],
      default: "To Do",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    location: {
      type: String,
      required: true,
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
