import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoById } from "../api/todoApi";
import { useDispatch } from "react-redux";
import { updateTodo } from "../redux/actions";

function EditTodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await getTodoById(id);

        const todo = response.data;

        setForm({
          name: todo.name || "",
          description: todo.description || "",
          priority: todo.priority || "medium",
          dueDate: todo.dueDate || "",
        });
      } catch (error) {
        console.error("Lỗi lấy Todo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    await dispatch(updateTodo(id, form));

    navigate("/list");
  };

  if (loading) {
    return <p>Đang tải công việc...</p>;
  }

  return (
    <div className="edit-todo-page">
      <h1>Sửa công việc</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Lưu thay đổi</button>

        <button type="button" onClick={() => navigate("/list")}>
          Hủy
        </button>
      </form>
    </div>
  );
}

export default EditTodoPage;
