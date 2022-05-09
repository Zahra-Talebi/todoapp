import axios from "axios";

const API_ADDRESS = "https://my-json-server.typicode.com/zahra-talebi/todoapp-json-server/";
const API_TIMEOUT = 10;

const webApi = axios.create({
  baseURL: API_ADDRESS,
  timeout: API_TIMEOUT * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  async getTasks() {
    return await webApi.get("/tasks/");
  },
  getTask(id) {
    return webApi.get(`/tasks/${id}/`);
  },
  addTask(taskInfo) {
    return webApi.post("/tasks/", taskInfo);
  },
  deleteTask(id) {
    return webApi.delete(`/tasks/${id}/`);
  },
  editTask(taskInfo) {
    return webApi.patch(`/tasks/${taskInfo.id}/`, taskInfo);
  },
};
