import { createStore } from "redux";
import reducer from "../reducers/taskReducer";

const store = createStore(reducer);
// let preloadedState
// const persistedTodosString = localStorage.getItem('todos')

// if (persistedTodosString) {
//   preloadedState = {
//     todos: JSON.parse(persistedTodosString)
//   }
// }

// const store = createStore(rootReducer, preloadedState)

export default store;
