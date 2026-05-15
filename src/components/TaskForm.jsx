import React, { useState, useContext, useId } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
  const [title, setTitle] = useState("");
  const { addTask } = useContext(TaskContext);

  // Unique input ID
  const inputId = useId();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      title,
      completed: false,
    };

    addTask(newTask);

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId}>New Task</label>

      <input
        id={inputId}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;