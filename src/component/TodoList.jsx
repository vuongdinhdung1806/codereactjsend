import { useSelector } from "react-redux";

import TodoItem from "./TodoItem";

function TodoList() {
  const { todos, filter, searchName, sortOrder } = useSelector(
    (state) => state,
  ); //Dùng useSelector nhận selector mới

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") {
        return todo.completed;
      }

      if (filter === "uncompleted") {
        return !todo.completed;
      }

      return true;
    })
    .filter((todo) => {
      return todo.name.toLowerCase().includes(searchName.toLowerCase());
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();

      const dateB = new Date(b.createdAt).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

  if (filteredTodos.length === 0) {
    return <p>Chưa có công việc nào.</p>;
  }

  return (
    <div>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
