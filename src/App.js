// Main App - fixed version ✅
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

const API = `${process.env.REACT_APP_BASE_API}/todos`;

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch todos on load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);

      console.log("API Response:", res.data);

      // ✅ handle both formats (array OR {data: []})
      const todosData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setTodos(todosData);
    } catch (err) {
      console.error("Todos nahi aaye bhai:", err.message);
      setTodos([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  // Add todo
  const addTodo = async (title) => {
    try {
      const res = await axios.post(API, { title });

      const newTodo = res.data.data || res.data;

      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      console.error("Add nahi hua:", err.message);
    }
  };

  // Toggle todo
  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.put(`${API}/${id}`, {
        completed: !completed,
      });

      const updatedTodo = res.data.data || res.data;

      setTodos((prev) =>
        prev.map((t) => (t._id === id ? updatedTodo : t))
      );
    } catch (err) {
      console.error("Toggle nahi hua:", err.message);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete nahi hua:", err.message);
    }
  };

  // Filter logic
  const filteredTodos = Array.isArray(todos)
    ? todos.filter((t) => {
        if (filter === "completed") return t.completed;
        if (filter === "pending") return !t.completed;
        return true;
      })
    : [];

  const filters = ["all", "pending", "completed"];

  return (
    <div className="app">
      <h1 className="app-title">Kaam Karle Bhai 😄</h1>
      <p className="app-subtitle">Tera personal task manager hai yeh!</p>
      <p>CI/CD autodeploy test 1</p>

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
        {Array.isArray(todos)
          ? todos.filter((t) => !t.completed).length
          : 0}{" "}
        kaam baaki hai 💪
      </p>

      {/* Loading */}
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