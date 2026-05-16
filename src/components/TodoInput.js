// TodoInput - yahan se naya todo add hota hai
import React, { useState } from "react";
import "./TodoInput.css";

function TodoInput({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return; // khali input mat bhejo
    onAdd(title.trim());
    setTitle(""); // input clear karo
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input yuvraj"
        placeholder="Kya karna? 🤔"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="add-btn">
        Add ✅
      </button>
    </form>
  );
}

export default TodoInput;
