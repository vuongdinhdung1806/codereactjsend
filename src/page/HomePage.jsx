import { Link } from "react-router-dom";
function HomePage() {
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
    </div>
  );
}
export default HomePage;
