import { useState } from "react";
import { useNavigate } from "react-router-dom";
function TodoForm({ addTodo }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    priority: "medium",
    dueDate: "",
    children: [],
  });
  const [child, setChild] = useState({
    name: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleChildChange = (e) => {
    setChild({
      ...child,
      [e.target.name]: e.target.value,
    });
  };
  // thêm child task vào form.children
  const addChildTask = () => {
    const now = new Date().toISOString();
    const newChild = {
      id: Date.now(),
      ...child,
      completed: false,
      createdat: now,
      updatedat: now,
    };
    setForm((prev) => ({
      ...prev,
      children: [newChild, ...prev.children],
    }));
    setChild({
      name: "",
      description: "",
      dueDate: "",
      priority: "medium",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault(); //
    if (!form.name.trim()) return;

    addTodo(form); //gọi hàm addTodo từ app.jsx thêm công việc

    setForm({
      name: "",
      description: "",
      dueDate: "",
      priority: "medium",
      children: [],
    }); // reset from sau khi thêm

    navigate("/list");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add công việc</h2>
      <input
        name="name"
        placeholder="Tên công việc"
        value={form.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Mô tả"
        value={form.description}
        onChange={handleChange}
      />

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="low">Thấp</option>
        <option value="medium">Trung bình</option>
        <option value="high">Cao</option>
      </select>

      <hr />
      <h3>Child Task</h3>

      <input
        name="name"
        placeholder="Tên child task"
        value={child.name}
        onChange={handleChildChange}
      />
      <textarea
        name="description"
        placeholder="Mô tả"
        value={child.description}
        onChange={handleChildChange}
      />

      <input
        type="date"
        name="dueDate"
        value={child.dueDate}
        onChange={handleChildChange}
      />

      <select
        name="priority"
        value={child.priority}
        onChange={handleChildChange}
      >
        <option value="low">Thấp</option>
        <option value="medium">Trung bình</option>
        <option value="high">Cao</option>
      </select>

      <button type="button" onClick={addChildTask}>
        + Add Child Task
      </button>
      <button type="submit">Thêm công việc</button>
    </form>
  );
}
export default TodoForm;
