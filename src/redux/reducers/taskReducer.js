import * as actionTypes from "../actions/types";

const initialState = {
  todos: [],
};

// state= {
//   todos: [
//     {
//       id:1,
//       content: {
//         title: "task1",
//         description: "this is a sample task",
//         dueDate: "2022-02-25",
//         label: "study"
//       },
//       complete: false,
//     },
//     ...
//   ],
// }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            content: action.payload.content,
            complete: false,
          },
        ],
      };
    case actionTypes.DELETE_TASK:
      return {
        ...state,
        todos: state.todos.filter((task) => task.id !== action.payload.id),
      };

    case actionTypes.CHANGE_COMPLETION:
      return {
        ...state,
        todos: state.todos.map((task) => {
          return task.id === action.payload.id
            ? { ...task, complete: !task.complete }
            : task;
        }),
      };

    case actionTypes.SORT_TASKS:
      const todos = action.payload.todos.map((task) => {
        return task;
      });
      return {
        ...state,
        todos: todos,
      };

    case actionTypes.EDIT_TASK:
      return {
        ...state,
        todos: state.todos.map((task) => {
          return task.id === action.payload.id
            ? { ...task, content: action.payload.content }
            : task;
        }),
      };

    case actionTypes.INITIAL_LIST:
      const list = action.payload.todos.map((task) => {
        return task;
      });
      return {
        ...state,
        todos: list,
      };

    default:
      return state;
  }
};

export default reducer;
