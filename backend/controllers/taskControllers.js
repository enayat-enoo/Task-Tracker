const Task = require("../models/taskModel");

async function createTask(req, res) {
  try {
    const { title, description, priority, dueDate, status } = req.body;

    // Extra validation (DB will also validate)
    if (!title || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Title and due date are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update task status",
      error: error.message,
    });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
}

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
