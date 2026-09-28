import {
  getTodos,
  createTodo,
  deleteTodo as deleteTodoApi,
  updateTodo as updateTodoApi,
} from "../api/todoApi";
import {
  ADD_TODO,
  DELETE_TODO,
  SET_FILTER,
  SET_SEARCH_NAME,
  SET_SORT_ORDER,
  TOGGLE_THEME,
  SET_TODOS,
  UPDATE_TODO,
} from "./actionTypes";
export const updateTodo = (id, data) => async (dispatch) => {
  try {
    const response = await updateTodoApi(id, data);

    dispatch({
      type: UPDATE_TODO,
      payload: response.data,
    });
  } catch (error) {
    console.error("Lỗi cập nhật Todo:", error);
    throw error;
  }
};
export const fetchTodos =
  (page = 1, limit = 5) =>
  async (dispatch) => {
    try {
      const response = await getTodos(page, limit);

      dispatch({
        type: SET_TODOS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Lỗi lấy danh sách Todo:", error);
    }
  };
export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

export const addTodo = (data) => async (dispatch) => {
  try {
    const response = await createTodo(data);
    console.log("gọi trong api createTodo");
    dispatch({
      type: ADD_TODO,
      payload: response.data,
    });
  } catch (error) {
    console.error("Lỗi thêm Todo:", error);
    throw error;
  }
};

export const addChildTodo = (parentId, data) => async (dispatch, getState) => {
  try {
    const { todos } = getState();

    const parentTodo = todos.find((todo) => todo.id === parentId);

    if (!parentTodo) return;

    const now = new Date().toISOString();

    const newChildTodo = {
      id: String(Date.now()),
      name: data.name.trim(),
      description: data.description?.trim() || "",
      priority: data.priority || "medium",
      dueDate: data.dueDate || "",
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    const newChildren = [newChildTodo, ...(parentTodo.children ?? [])];

    await dispatch(
      updateTodo(parentId, {
        children: newChildren,
      }),
    );
  } catch (error) {
    console.error("Lỗi thêm công việc con:", error);
  }
};

export const toggleCompleted =
  (parentId, childId = null) =>
  async (dispatch, getState) => {
    try {
      const { todos } = getState();

      const parentTodo = todos.find((todo) => todo.id === parentId);

      if (!parentTodo) return;

      // Toggle Parent
      if (childId === null) {
        const newCompleted = !parentTodo.completed;

        if (
          newCompleted &&
          parentTodo.children?.some((child) => !child.completed)
        ) {
          return;
        }

        await dispatch(
          updateTodo(parentId, {
            completed: newCompleted,
          }),
        );

        return;
      }

      // Toggle Child
      const newChildren = (parentTodo.children ?? []).map((child) =>
        child.id === childId
          ? {
              ...child,
              completed: !child.completed,
            }
          : child,
      );

      const allChildrenCompleted =
        newChildren.length > 0 && newChildren.every((child) => child.completed);

      await dispatch(
        updateTodo(parentId, {
          children: newChildren,
          completed: allChildrenCompleted,
        }),
      );
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái Todo:", error);
    }
  };

export const deleteTodo =
  (parentId, childId = null) =>
  async (dispatch, getState) => {
    try {
      const { todos } = getState();

      const parentTodo = todos.find((todo) => todo.id === parentId);

      if (!parentTodo) return;

      // Xóa Parent
      if (childId === null) {
        await deleteTodoApi(parentId);
      }

      // Xóa Child
      else {
        const newChildren = (parentTodo.children ?? []).filter(
          (child) => child.id !== childId,
        );

        await dispatch(
          updateTodo(parentId, {
            children: newChildren,
            completed:
              newChildren.length > 0 &&
              newChildren.every((child) => child.completed),
          }),
        );
      }

      // API thành công → cập nhật Redux
      if (childId === null) {
        dispatch({
          type: DELETE_TODO,
          payload: { parentId, childId },
        });

        const { currentPage, limit, total } = getState();
        const lastPage = Math.max(1, Math.ceil(total / limit));

        if (currentPage > lastPage) {
          await dispatch(fetchTodos(lastPage, limit));
        }
      }
    } catch (error) {
      console.error("Lỗi xóa Todo:", error);
    }
  };

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setSearchName = (searchName) => ({
  type: SET_SEARCH_NAME,
  payload: searchName,
});

export const setSortOrder = (sortOrder) => ({
  type: SET_SORT_ORDER,
  payload: sortOrder,
});
// hành động gọi đến bởi dispatch (tạo action)
