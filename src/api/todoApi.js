import axiosClient from "./axiosClient";

export const getTodos = (page = 1, limit = 5) => {
  return axiosClient.get("/todos", {
    params: {
      page,
      limit,
    },
  });
};
// lấy danh sáchs

export const createTodo = (todo) => {
  return axiosClient.post("/todos", todo);
};

export const updateTodo = (id, todo) => {
  return axiosClient.put(`/todos/${id}`, todo);
};
// lấy danh sáchs cũ
export const getTodoById = (id) => {
  return axiosClient.get(`/todos/${id}`);
};

export const deleteTodo = (id) => {
  return axiosClient.delete(`/todos/${id}`);
};
// chứa hàm giao tiếp
