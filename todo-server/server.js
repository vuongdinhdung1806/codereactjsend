const express = require("express");
const cors = require("cors");

const todos = require("./todos");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// GET ALL
app.get("/todos", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const start = (page - 1) * limit;
  const end = start + limit;

  const sortedTodos = [...todos].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  const paginatedTodos = sortedTodos.slice(start, end);

  res.json({
    data: paginatedTodos,
    page,
    limit,
    total: todos.length,
  });
});

// GET ONE
app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo không tồn tại",
    });
  }

  res.json(todo);
});

// CREATE
app.post("/todos", (req, res) => {
  const newTodo = {
    id: Date.now(),
    ...req.body,
    completed: false,
    children: req.body.children || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// UPDATE
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Todo không tồn tại",
    });
  }

  todos[index] = {
    ...todos[index],
    ...req.body,
    id: todos[index].id,
    updatedAt: new Date().toISOString(),
  };

  res.json(todos[index]);
});

// DELETE
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Todo không tồn tại",
    });
  }

  const deletedTodo = todos.splice(index, 1);

  res.json(deletedTodo[0]);
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
