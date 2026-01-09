const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

//Create a task
router.post("/", createTask);

//Get All tasks
router.get("/", getAllTasks);

//Update a task
router.put("/", updateTask);

//Delete a task
router.delete("/", deleteTask);

module.exports = router;
