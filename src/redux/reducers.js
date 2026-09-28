import {
  SET_TODOS,
  ADD_TODO,
  ADD_CHILD_TODO,
  TOGGLE_COMPLETED,
  DELETE_TODO,
  SET_FILTER,
  SET_SEARCH_NAME,
  SET_SORT_ORDER,
  TOGGLE_THEME,
  UPDATE_TODO,
} from "./actionTypes";

const initialState = {
  todos: [],
  filter: "all",
  searchName: "",
  sortOrder: "newest",
  theme: "light",
  currentPage: 1,
  limit: 5,
  total: 0,
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TODOS: {
      const payload = action.payload ?? {};

      return {
        ...state,
        todos: Array.isArray(payload) ? payload : payload.data ?? [],
        currentPage: payload.page ?? state.currentPage,
        limit: payload.limit ?? state.limit,
        total: payload.total ?? state.total,
      };
    }
    case ADD_TODO: {
      const todo = action.payload;

      return {
        ...state,
        todos: [todo, ...state.todos],
        total: state.total + 1,
      };
    }

    case ADD_CHILD_TODO: {
      const { parentId, data } = action.payload;

      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === parentId
            ? {
                ...todo,
                children: [data, ...(todo.children ?? [])],
                updatedAt: new Date().toISOString(),
              }
            : todo,
        ),
      };
    }
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case TOGGLE_COMPLETED: {
      const { parentId, childId } = action.payload;

      const now = new Date().toISOString();

      return {
        ...state,

        todos: state.todos.map((todo) => {
          // Toggle Parent
          if (childId === null && todo.id === parentId) {
            // Parent không có child
            if (todo.children.length === 0) {
              return {
                ...todo,
                completed: !todo.completed,
                updatedAt: now,
              };
            }

            const allChildrenCompleted = todo.children.every(
              (child) => child.completed,
            );

            if (!todo.completed && !allChildrenCompleted) {
              return todo;
            }

            return {
              ...todo,
              completed: !todo.completed,
              updatedAt: now,
            };
          }

          // Toggle Child
          if (childId !== null && todo.id === parentId) {
            const newChildren = todo.children.map((child) =>
              child.id === childId
                ? {
                    ...child,
                    completed: !child.completed,
                    updatedAt: now,
                  }
                : child,
            );

            const allChildrenCompleted =
              newChildren.length > 0 &&
              newChildren.every((child) => child.completed);

            return {
              ...todo,
              children: newChildren,
              completed: allChildrenCompleted,
              updatedAt: now,
            };
          }

          return todo;
        }),
      };
    }

    case DELETE_TODO: {
      const { parentId, childId } = action.payload;

      // Xóa Parent
      if (childId === null) {
        return {
          ...state,

          todos: state.todos.filter((todo) => todo.id !== parentId),
          total: Math.max(0, state.total - 1),
        };
      }

      // Xóa Child
      return {
        ...state,

        todos: state.todos.map((todo) =>
          todo.id === parentId
            ? {
                ...todo,
                children: (todo.children ?? []).filter((child) => child.id !== childId),
                updatedAt: new Date().toISOString(),
              }
            : todo,
        ),
      };
    }
    case UPDATE_TODO: {
      const updatedTodo = action.payload;

      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      };
    }
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case SET_SEARCH_NAME:
      return {
        ...state,
        searchName: action.payload,
      };

    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };

    default:
      return state;
  }
}

export default todosReducer;
// nhận state và action và thực hiện xử lí thay đồi
