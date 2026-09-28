let todos = [
  {
    id: 1,
    name: "Học React",
    description: "Học component và state",
    priority: "high",
    dueDate: "2026-09-30",
    completed: false,
    children: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Học NodeJS",
    description: "Xây dựng RESTful API",
    priority: "medium",
    dueDate: "2026-10-05",
    completed: false,
    children: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

module.exports = todos;
