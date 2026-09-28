import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/actions";
function HomePage() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  return (
    <div className="Home-page">
      <h1>Todos</h1>
      <div className="navbar">
        <Link to="/add">
          <button>Thêm công việc</button>
        </Link>
        <Link to="/list">
          <button>Danh sách công việc</button>
        </Link>
      </div>
      <button type="button" onClick={() => dispatch(toggleTheme())}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
}
export default HomePage;
