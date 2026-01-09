function TaskItem({ task, onStatusUpdate, onDelete }) {
  const { _id, title, description, priority, dueDate, status } = task;

  const isCompleted = status === "Completed";

  return (
    <div className={`task-item ${isCompleted ? "completed" : ""}`}>
      <div>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <p>
          <strong>Priority:</strong> {priority}
        </p>
        <p>
          <strong>Due:</strong>{" "}
          {new Date(dueDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={isCompleted ? "status-complete" : "status-pending"}>
            {status}
          </span>
        </p>
      </div>

      <div className="task-actions">
        {status === "Pending" && (
          <button onClick={() => onStatusUpdate(_id)}>
            Mark Completed
          </button>
        )}
        <button className="delete-btn" onClick={() => onDelete(_id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
