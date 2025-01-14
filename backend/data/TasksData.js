import Task from "../models/TaskModel.js";

// Array of tasks to be inserted
const tasks = [
  {
    title: "Inspect HVAC System",
    description: "Inspect and troubleshoot the HVAC system in the main lobby.",
    status: "In Progress",
    date: "2025-01-13T09:00:00.000Z",
    location: "Main Lobby",
    assignedTo: ["6786b438f2d554a94784c335", "6786b438f2d554a94784c334"],
    priority: "High",
    activities: [
      {
        action: "Created task",
        performedBy: "6786b438f2d554a94784c335",
        timestamp: "2025-01-13T10:00:00.000Z",
        notes: "Task created and assigned to the HVAC team.",
      },
      {
        action: "Inspected system",
        performedBy: "6786b438f2d554a94784c334",
        timestamp: "2025-01-13T12:00:00.000Z",
        notes: "Identified airflow issues.",
      },
    ],
  },
  {
    title: "Repair Cold Room",
    description:
      "Fix the cold room evaporator to comply with HACCP requirements.",
    status: "Pending",
    date: "2025-01-13T09:30:00.000Z",
    location: "Cold Storage",
    assignedTo: ["6786b438f2d554a94784c333", "6786b438f2d554a94784c332"],
    priority: "Medium",
    activities: [
      {
        action: "Created task",
        performedBy: "6786b438f2d554a94784c331",
        timestamp: "2025-01-13T10:10:00.000Z",
        notes: "Prioritize repair to avoid compliance issues.",
      },
    ],
  },
  {
    title: "Replace Faulty Breaker",
    description: "Replace the 60-amp fuse holder with a circuit breaker.",
    status: "Completed",
    date: "2025-01-12T15:00:00.000Z",
    location: "Boiler Room",
    assignedTo: ["6786b438f2d554a94784c330", "6786b438f2d554a94784c32f"],
    priority: "High",
    activities: [
      {
        action: "Created task",
        performedBy: "6786b438f2d554a94784c32e",
        timestamp: "2025-01-12T14:30:00.000Z",
        notes: "Task created due to breaker malfunction.",
      },
      {
        action: "Breaker replaced",
        performedBy: "6786b438f2d554a94784c32f",
        timestamp: "2025-01-12T15:30:00.000Z",
        notes: "Replacement completed successfully.",
      },
    ],
  },
  {
    title: "Update Mini Bar Controller",
    description:
      "Diagnose and update the PCB controller for guest room mini bars.",
    status: "In Progress",
    date: "2025-01-14T10:00:00.000Z",
    location: "Guest Rooms",
    assignedTo: ["6786b438f2d554a94784c32d", "6786b438f2d554a94784c32c"],
    priority: "Low",
    activities: [
      {
        action: "Created task",
        performedBy: "6786b438f2d554a94784c32b",
        timestamp: "2025-01-14T10:05:00.000Z",
        notes: "Investigate potential PCB faults.",
      },
    ],
  },
  {
    title: "Inspect Refrigerators",
    description: "Check and repair refrigerators in the main kitchen.",
    status: "To Do",
    date: "2025-01-15T09:00:00.000Z",
    location: "Main Kitchen",
    assignedTo: [
      "6786b438f2d554a94784c329",
      "6786b438f2d554a94784c328",
      "6786b438f2d554a94784c327",
    ],
    priority: "Medium",
    activities: [],
  },
  {
    title: "Calibrate Boiler Controller",
    description: "Test and recalibrate the boiler's automatic controller.",
    status: "Pending",
    date: "2025-01-12T08:00:00.000Z",
    location: "Boiler Room",
    assignedTo: ["6786b438f2d554a94784c326", "6786b438f2d554a94784c325"],
    priority: "Medium",
    activities: [
      {
        action: "Created task",
        performedBy: "6786b438f2d554a94784c326",
        timestamp: "2025-01-12T08:30:00.000Z",
        notes: "Schedule during off-peak hours.",
      },
    ],
  },
];

// Insert multiple tasks
const insertManyTasks = async () => {
  try {
    await Task.insertMany(tasks);
    console.log("Tasks inserted successfully!");
  } catch (error) {
    console.error("Error inserting tasks:", error);
  }
};

// Delete all tasks
const deleteAllTasks = async () => {
  try {
    const result = await Task.deleteMany({});
    console.log(`${result.deletedCount} tasks deleted successfully!`);
  } catch (error) {
    console.error("Error deleting tasks:", error);
  }
};

export { insertManyTasks, deleteAllTasks };
