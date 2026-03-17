// Main App - yahan saara logic hai bhai 🧠
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

const API = "/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all | completed | pending
  const [loading, setLoading] = useState(true);

  // App load hote hi saare todos fetch karo
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API);
      setTodos(data);
    } catch (err) {
      console.error("Todos nahi aaye bhai:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Naya todo add karo
  const addTodo = async (title) => {
    try {
      const { data } = await axios.post(API, { title });
      setTodos((prev) => [data, ...prev]); // UI mein turant dikhao
    } catch (err) {
      console.error("Add nahi hua:", err.message);
    }
  };

  // Todo complete/incomplete toggle karo
  const toggleTodo = async (id, completed) => {
    try {
      const { data } = await axios.put(`${API}/${id}`, { completed: !completed });
      setTodos((prev) => prev.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      console.error("Toggle nahi hua:", err.message);
    }
  };

  // Todo delete karo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete nahi hua:", err.message);
    }
  };

  // Filter apply karo
  const filteredTodos = todos.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  const filters = ["all", "pending", "completed"];

  return (
    <div className="app">
      <h1 className="app-title">Kaam Karle Bhai 😄</h1>
      <p className="app-subtitle">Tera personal task manager hai yeh!</p>

      <TodoInput onAdd={addTodo} />

      {/* Filter buttons */}
      <div className="filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats */}
      <p className="stats">
        {todos.filter((t) => !t.completed).length} kaam baaki hai 💪
      </p>

      {/* Loading spinner */}
      {loading ? (
        <div className="spinner">⏳ Load ho raha hai...</div>
      ) : (
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;
