import TodoForm from "../component/TodoForm";
function TodoFormPage({ addTodo }) {
  return (
    <div className="add-todo-page">
      <h1> Thêm công việc</h1>
      <TodoForm addTodo={addTodo}></TodoForm>
    </div>
  );
}
export default TodoFormPage;
