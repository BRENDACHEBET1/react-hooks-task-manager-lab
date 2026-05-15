import React, { useState, useEffect, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";
import TaskList from "./TaskList";

function App() {
  const { setTasks } = useContext(TaskContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, [setTasks]);

  return (
    <div>
      <h1>Task Manager</h1>

      <TaskForm />

      <SearchBar onSearch={setQuery} />

      <TaskList query={query} />
    </div>
  );
}

export default App;