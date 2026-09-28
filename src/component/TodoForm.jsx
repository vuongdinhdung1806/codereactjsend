import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addTodo } from "../redux/actions";

function TodoForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const addChildTask = () => {
    if (!child.name.trim()) return;

    const now = new Date().toISOString();

    const newChild = {
      id: Date.now(),
      ...child,
      completed: false,
      createdAt: now,
      updatedAt: now,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    try {
      await dispatch(addTodo(form));
      console.log("Đã chạy qua dispatch:");
      setForm({
        name: "",
        description: "",
        dueDate: "",
        priority: "medium",
        children: [],
      });

      navigate("/list");
    } catch (error) {
      console.error("Không thể thêm công việc:", error);
    }
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
