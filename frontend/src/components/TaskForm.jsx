import { useState } from "react";
import { createTask } from "../services/taskApi";

const initialState = {
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
};

function TaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error on change
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Client-side validation
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const response = await createTask(formData);

      if (response.success) {
        onTaskCreated(response.data);
        setFormData(initialState);
      } else {
        alert(response.message || "Failed to create task");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.title.trim() && formData.dueDate && !isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Create Task</h2>

      <div>
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Optional description"
        />
      </div>

      <div>
        <label>Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label>Due Date *</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        {errors.dueDate && <p className="error">{errors.dueDate}</p>}
      </div>

      <button type="submit" disabled={!isFormValid}>
        {isSubmitting ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}

export default TaskForm;
