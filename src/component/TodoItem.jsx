import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addChildTodo, toggleCompleted, deleteTodo } from "../redux/actions";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showChildren, setShowChildren] = useState(false);

  const [childName, setChildName] = useState("");

  const handleAddChild = () => {
    if (!childName.trim()) return;

    dispatch(
      addChildTodo(todo.id, {
        name: childName,
        description: "",
        priority: "medium",
        dueDate: "",
      }),
    );

    setChildName("");

    setShowChildren(true);
  };

  return (
    <div className="todo-item">
      <div className="parent-todo">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            if (
              !todo.completed &&
              todo.children &&
              todo.children.length > 0 &&
              !todo.children.every((child) => child.completed)
            ) {
              alert("Hãy hoàn thành tất cả công việc con trước!");
              return;
            }

            dispatch(toggleCompleted(todo.id));
          }}
        />

        <h3
          onClick={() => setShowChildren(!showChildren)}
          style={{
            cursor: "pointer",
          }}
        >
          {todo.name}
        </h3>
        <button type="button" onClick={() => navigate(`/edit/${todo.id}`)}>
          Sửa
        </button>
        <button
          type="button"
          onClick={() => {
            if (
              window.confirm("Bạn có chắc chắn muốn xóa công việc này không?")
            ) {
              dispatch(deleteTodo(todo.id));
            }
          }}
        >
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
                  onChange={() => dispatch(toggleCompleted(todo.id, child.id))}
                />

                <span>{child.name}</span>

                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Bạn có chắc chắn muốn xóa công việc con này không?",
                      )
                    ) {
                      dispatch(deleteTodo(todo.id, child.id));
                    }
                  }}
                >
                  Xóa
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
