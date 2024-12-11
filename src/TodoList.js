import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const savedTodos = localStorage.getItem(`todos_${currentUser.id}`);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, [currentUser.id]);

  const saveTodos = (newTodos) => {
    localStorage.setItem(`todos_${currentUser.id}`, JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const newTodos = [...todos, { id: Date.now(), text: newTodo }];
    saveTodos(newTodos);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(newTodos);
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editingText } : todo
    );
    saveTodos(newTodos);
    setEditingId(null);
  };

  return (
    <div className="todo-container">
      <div className="header">
        <h2>Todo List</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
              </div>
            ) : (
              <div>
                <span>{todo.text}</span>
                <button onClick={() => startEditing(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
