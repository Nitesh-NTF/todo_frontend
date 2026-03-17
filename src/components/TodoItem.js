// TodoItem - ek single todo item - checkbox + title + delete button
import React from "react";
import "./TodoItem.css";

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {/* Checkbox - complete/incomplete toggle */}
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
      />

      {/* Todo title - strike-through agar complete hai */}
      <span className="todo-title">{todo.title}</span>

      {/* Delete button */}
      <button
        className="delete-btn"
        onClick={() => onDelete(todo._id)}
        title="Delete karo"
      >
        🗑️
      </button>
    </li>
  );
}

export default TodoItem;
