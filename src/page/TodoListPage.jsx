import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TodoList from "../component/TodoList";

import { setFilter, setSearchName, setSortOrder } from "../redux/actions";
import { useEffect } from "react";
import { fetchTodos } from "../redux/actions";
function TodoListPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("FETCH TODOS ĐƯỢC GỌI");
    dispatch(fetchTodos());
  }, [dispatch]);
  const { filter, searchName, sortOrder, currentPage, limit, total } =
    useSelector((state) => state);
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const handlePageChange = (page) => {
    dispatch(fetchTodos(page, limit));
  };
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
          <button type="button" onClick={() => dispatch(setFilter("all"))}>
            Tất cả
          </button>

          <button
            type="button"
            onClick={() => dispatch(setFilter("completed"))}
          >
            Đã hoàn thành
          </button>

          <button
            type="button"
            onClick={() => dispatch(setFilter("uncompleted"))}
          >
            Chưa hoàn thành
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm tên công việc..."
            value={searchName}
            onChange={(e) => dispatch(setSearchName(e.target.value))}
          />
        </div>

        <div className="sort-box">
          <label>Sắp xếp:</label>

          <select
            value={sortOrder}
            onChange={(e) => dispatch(setSortOrder(e.target.value))}
          >
            <option value="newest">Mới nhất</option>

            <option value="oldest">Cũ nhất</option>
          </select>
        </div>

        <TodoList />
        <div className="pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoListPage;
