import React, { useEffect, useState } from "react";
import axios from "axios";

import Create from "./Create";

import {
  BsCircleFill,
  BsTrashFill,
  BsPencilSquare,
  BsCheckCircleFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [editText, setEditText] = useState("");

  /* GET TODOS */
  const fetchTodos = () => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  /* DELETE TASK */
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  /* COMPLETE TASK */
  const handleComplete = (id) => {
    axios
      .put(`http://localhost:3001/complete/${id}`)
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  /* START EDIT */
  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.task);
  };

  /* UPDATE TASK */
  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`, {
        task: editText,
      })
      .then(() => {
        setEditingId(null);
        setEditText("");
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h1>Todo App</h1>

      <Create refresh={fetchTodos} />

      {todos.length === 0 ? (
        <div className="empty">
          <h2>No Tasks Found</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="left">

              <div onClick={() => handleComplete(todo._id)}>
                {todo.done ? (
                  <BsCheckCircleFill className="done-icon" />
                ) : (
                  <BsCircleFill className="circle-icon" />
                )}
              </div>

              {editingId === todo._id ? (
                <input
                  className="edit-input"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <p className={todo.done ? "completed" : ""}>
                  {todo.task}
                </p>
              )}
            </div>

            <div className="right">

              {editingId === todo._id ? (
                <button
                  className="save-btn"
                  onClick={() => handleUpdate(todo._id)}
                >
                  Save
                </button>
              ) : (
                <BsPencilSquare
                  className="edit-icon"
                  onClick={() => startEdit(todo)}
                />
              )}

              <BsTrashFill
                className="delete-icon"
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;