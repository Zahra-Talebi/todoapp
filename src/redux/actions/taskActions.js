import * as actionTypes from "./types";

export const addTask = (id, taskContent) => {
  return {
    type: actionTypes.ADD_TASK,
    payload: {
      id,
      content: taskContent,
    },
  };
};

export const deleteTask = (id) => {
  return {
    type: actionTypes.DELETE_TASK,
    payload: {
      id,
    },
  };
};

export const changeComplition = (id) => {
  return {
    type: actionTypes.CHANGE_COMPLETION,
    payload: {
      id,
    },
  };
};

export const sortTasks = (todos) => {
  return {
    type: actionTypes.SORT_TASKS,
    payload: {
      todos,
    },
  };
};

export const editTask = (id, taskContent) => {
  return {
    type: actionTypes.EDIT_TASK,
    payload: {
      id,
      content: taskContent,
    },
  };
};

export const initialList = (todos) => {
  return {
    type: actionTypes.INITIAL_LIST,
    payload: {
      todos,
    },
  };
};
