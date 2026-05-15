import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Add new task
  const addTask = (newTask) => {
    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((r) => r.json())
      .then((addedTask) => {
        // Update UI
        setTasks((prevTasks) => [...prevTasks, addedTask]);
      })
      .catch((err) => console.error(err));
  };

  // Toggle complete
  const toggleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    const updatedTask = {
      ...task,
      completed: !task.completed,
    };

    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: updatedTask.completed,
      }),
    })
      .then((r) => r.json())
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === id ? updatedTask : t
          )
        );
      });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        toggleComplete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}