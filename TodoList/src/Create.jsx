import React, { useState } from "react";
import axios from "axios";

function Create({ refresh }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;

    axios
      .post("http://localhost:3001/add", {
        task,
      })
      .then(() => {
        setTask("");
        refresh();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;