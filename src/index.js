import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import "antd/dist/antd.min.css";
import "./styles/index.css";

import ToDoList from "./components/toDoList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <h1>Just Do It!</h1>
      <ToDoList />
    </Provider>
  </React.StrictMode>
);
