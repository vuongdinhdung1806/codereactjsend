import { useCallback, useState } from "react";
import HomePage from "./page/HomePage";
import TodoFormPage from "./page/TodoFormPage";
import TodoListPage from "./page/TodoListPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchName, setSearchName] = useState("");

  const [sortOrder, setSortOrder] = useState("newest");
  const addTodo = useCallback((data) => {
    if (!data.name?.trim()) return;
    const now = new Date().toISOString();
    const newTodo = {
      id: Date.now(),
      name: data.name.trim(),
      description: data.description?.trim() || "",
      priority: data.priority || "medium",
      dueDate: data.dueDate || "",
      completed: false,
      children: data.children || [],
      createdat: now,
      updatedat: now,
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);
  const addChildTodo = useCallback((parentId, data) => {
    if (!data.name?.trim()) return;
    const now = new Date().toISOString();
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === parentId
          ? {
              ...todo,
              updatedat: now,
              children: [
                {
                  id: Date.now(),
                  name: data.name.trim(),
                  description: data.description?.trim() || "",
                  priority: data.priority,
                  dueDate: data.dueDate,
                  completed: false,
                  createdat: now,
                  updatedat: now,
                },
                ...todo.children,
              ],
            }
          : todo,
      ),
    );
  }, []);
  const toggleCompleted = useCallback((parentId, childId = null) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (childId === null && todo.id === parentId) {
          // Parent không có child
          if (todo.children.length === 0) {
            return {
              ...todo,
              completed: !todo.completed,
              updatedat: new Date().toISOString(),
            };
          }
          // Kiểm tra tất cả child
          const allChildrenCompleted = todo.children.every(
            (child) => child.completed,
          );

          // Còn child chưa hoàn thành
          if (!todo.completed && !allChildrenCompleted) {
            alert("Hãy hoàn thành tất cả công việc con trước!");
            return todo;
          }

          return {
            ...todo,
            completed: !todo.completed,
            updatedat: new Date().toISOString(),
          };
        }
        // Đang click Child

        if (childId !== null && todo.id === parentId) {
          const newChildren = todo.children.map((child) =>
            child.id === childId
              ? {
                  ...child,
                  completed: !child.completed,
                  updatedat: new Date().toISOString(),
                }
              : child,
          );

          const allChildrenCompleted = newChildren.every(
            (child) => child.completed,
          );

          return {
            ...todo,
            children: newChildren,
            completed: allChildrenCompleted,
            updatedat: new Date().toISOString(),
          };
        }

        return todo;
      }),
    );
  }, []);
  const deleteTodo = useCallback((parentId, childId = null) => {
    setTodos((prev) => {
      // XÓA CHILD
      if (childId !== null) {
        return prev.map((todo) =>
          todo.id === parentId
            ? {
                ...todo,
                children: todo.children.filter((child) => child.id !== childId), //
                updatedat: new Date().toISOString(),
              }
            : todo,
        );
      }

      // XÓA PARENT
      return prev.filter((todo) => todo.id !== parentId);
    });
  }, []);
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") {
        return todo.completed;
      }

      if (filter === "uncompleted") {
        return !todo.completed;
      }

      return true;
    })
    .filter((todo) => {
      // Tìm theo tên Parent
      return todo.name.toLowerCase().includes(searchName.toLowerCase());
    })
    .sort((a, b) => {
      const dateA = new Date(a.updatedat).getTime();
      const dateB = new Date(b.updatedat).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<TodoFormPage addTodo={addTodo} />} />
      <Route
        path="/list"
        element={
          <TodoListPage
            todos={filteredTodos}
            addChildTodo={addChildTodo}
            toggleCompleted={toggleCompleted}
            deleteTodo={deleteTodo}
            filter={filter}
            setFilter={setFilter}
            searchName={searchName}
            setSearchName={setSearchName}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        }
      />
    </Routes>
  );
}
export default App;
