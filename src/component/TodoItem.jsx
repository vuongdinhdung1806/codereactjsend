import { useState } from "react";
function TodoItem({ todo, addChildTodo, toggleCompleted, deleteTodo }) {
  const [showChildren, setShowChildren] = useState(false); // child đang đóng
  const [childName, setChildName] = useState("");
  const handleAddChild = () => {
    if (!childName.trim()) return;

    addChildTodo(todo.id, {
      name: childName,
      description: "",
      priority: "medium",
      dueDate: "",
    });

    setChildName("");

    setShowChildren(true);
  };
  return (
    <div className="todo-item">
      <div className="parent-todo">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleCompleted(todo.id)}
        />
        <h3
          onClick={() => setShowChildren(!showChildren)}
          style={{ cursor: "pointer" }}
        >
          {todo.name}
        </h3>
        <button type="button" onClick={() => deleteTodo(todo.id)}>
          Xóa
        </button>
      </div>
      <p>{todo.description}</p>

      <p>Ưu tiên: {todo.priority}</p>

      <p>Hạn: {todo.dueDate || "Không có"}</p>

      {showChildren && (
        <div className="child-list">
          <h4>Child Tasks</h4>
          {todo.children && todo.children.length > 0 ? (
            todo.children.map((child) => (
              <div key={child.id} className="child-item">
                <input
                  type="checkbox"
                  checked={child.completed}
                  onChange={() => toggleCompleted(todo.id, child.id)}
                />

                <span>{child.name}</span>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id, child.id)}
                >
                  xoá
                </button>
              </div>
            ))
          ) : (
            <p>Không có công việc con</p>
          )}

          <div className="add-child">
            <input
              type="text"
              placeholder="Tên công việc con..."
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
            />

            <button type="button" onClick={handleAddChild}>
              + Thêm Child
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
