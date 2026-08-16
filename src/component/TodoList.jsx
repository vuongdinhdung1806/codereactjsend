import TodoItem from "./TodoItem";
function TodoList({
  todos,
  addChildTodo,
  toggleCompleted,
  deleteTodo,
  filter,
  setFilter,
}) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          addChildTodo={addChildTodo}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
          filter={filter}
          setFilter={setFilter}
        />
      ))}
    </div>
  );
}

export default TodoList;
