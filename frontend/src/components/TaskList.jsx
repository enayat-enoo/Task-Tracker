import TaskItem from "./TaskItem";

function TaskList({ tasks, onStatusUpdate, onDelete }) {
  if (!tasks.length) {
    return <p>No tasks available</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onStatusUpdate={onStatusUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
