const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

//Create a task
router.post("/tasks", createTask);

//Get All tasks
router.get("/tasks", getAllTasks);

//Update a task
router.put("/tasks/:id", updateTask);

//Delete a task
router.delete("/tasks/:id", deleteTask);

module.exports = router;
