// TodoList - saare todos ki list dikhata hai
import React from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

function TodoList({ todos, onToggle, onDelete }) {
  // Agar koi todo nahi hai toh funny message dikhao
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>Bhai kuch kaam hi nahi hai kya? 🤔</p>
        <span>Upar se kuch add kar!</span>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
