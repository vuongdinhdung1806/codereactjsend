import { useCallback, useState } from "react";
import HomePage from "./page/HomePage";
import TodoFormPage from "./page/TodoFormPage";
import TodoListPage from "./page/TodoListPage";
import EditTodoPage from "./page/EditTodoPage";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
const FILTER = {
  ALL: "all",
  COMPLETED: "completed",
  UNCOMPLETED: "uncompleted",
};
const SORT_ORDER = {
  NEWEST: "newest",
  OLDEST: "oldest",
};

const PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

function App() {
  const theme = useSelector((state) => state.theme);
  return (
    <div className={`app ${theme}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<TodoFormPage />} />
        <Route path="/list" element={<TodoListPage />} />
        <Route path="/edit/:id" element={<EditTodoPage />} />
      </Routes>
    </div>
  );
}

export default App;
