import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, updateTaskStatus, deleteTask } from "./services/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTasks();

      if (response.success) {
        setTasks(response.data);
      } else {
        setError(response.message || "Failed to fetch tasks");
      }
    } catch (err) {
      setError("Something went wrong while fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  // Add new task to state
  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // Update task status
  const handleStatusUpdate = async (id) => {
    try {
      const response = await updateTaskStatus(id, "Completed");

      if (response.success) {
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? response.data : task))
        );
      } else {
        alert(response.message || "Failed to update task");
      }
    } catch (error) {
      alert("Error updating task");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteTask(id);

      if (response.success) {
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        alert(response.message || "Failed to delete task");
      }
    } catch (error) {
      alert("Error deleting task");
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <h1>Task Tracker</h1>

      <TaskForm onTaskCreated={handleTaskCreated} />

      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && (
        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          onStatusUpdate={handleStatusUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
