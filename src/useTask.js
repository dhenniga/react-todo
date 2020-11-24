import { useState } from "react";
import axios from "axios";
import { converter } from "./app.service";
import { v4 as uuidv4 } from 'uuid';

const useTask = () => {

  const api = axios.create({
    baseUrl: `http://localhost:5000/`
  });

  const [taskData, setTaskData] = useState([]);

  const getTasks = async () => {
    let data = await api.get(`/tasks`)
      .then(({ data }) => data);
    setTaskData(converter(data))
  };

  const createTask = async (rootKey) => {
    await api.post(`/tasks/`, {
      "id": uuidv4(),
      "text": "Enter task Name...",
      "group": rootKey,
      "isChecked": false
    });
    getTasks();
  };

  const createTaskGroup = async () => {
    await api.post(`/tasks/`, {
      "id": uuidv4(),
      "text": "",
      "group": "",
      "isChecked": false
    });
    getTasks();
  };

  const deleteTask = async id => {
    await api.delete(`/tasks/${id}`);
    getTasks();
  };

  return {
    getTasks,
    createTask,
    createTaskGroup,
    deleteTask,
    taskData
  }
}

export default useTask;