import { Link } from "react-router-dom";
import TodoList from "../component/TodoList";

function TodoListPage({
  todos,
  addChildTodo,
  toggleCompleted,
  deleteTodo,
  filter,
  setFilter,
  searchName,
  setSearchName,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="todo-container">
      <div className="list-todo-page">
        <h1>Danh sách công việc</h1>

        <div className="navbar">
          <Link to="/">
            <button>🏠 Home</button>
          </Link>

          <Link to="/add">
            <button>➕ Thêm công việc</button>
          </Link>
        </div>
        <div className="filter-buttons">
          <button type="button" onClick={() => setFilter("all")}>
            Tất cả
          </button>

          <button type="button" onClick={() => setFilter("completed")}>
            Đã hoàn thành
          </button>

          <button type="button" onClick={() => setFilter("uncompleted")}>
            Chưa hoàn thành
          </button>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm tên công việc..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="sort-box">
          <label>Sắp xếp:</label>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Mới nhất</option>

            <option value="oldest">Cũ nhất</option>
          </select>
        </div>

        {todos.length === 0 ? (
          <p>Chưa có công việc nào.</p>
        ) : (
          <TodoList
            todos={todos}
            addChildTodo={addChildTodo}
            toggleCompleted={toggleCompleted}
            deleteTodo={deleteTodo}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>
    </div>
  );
}
export default TodoListPage;
