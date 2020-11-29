import axios from "axios";
import { converter } from "./app.service";
import { v4 as uuidv4 } from 'uuid';
import { map, reduce, values, keys } from "ramda";

const useTask = updateTasks => {

  const api = axios.create({
    baseUrl: `http://localhost:5000`
  });

  /////////////////////////////

  const getTasks = () =>
    api.get(`/tasks`)
      .then(({ data }) => converter(data));

  /////////////////////////////

  const createTask = rootKey =>
    api.post(`/tasks/`, {
      "id": uuidv4(),
      "text": "",
      "group": rootKey,
      "isChecked": false
    })
      .then(getTasks().then(updateTasks));

  /////////////////////////////

  const createTaskGroup = () =>
    api.post(`/tasks/`, {
      "id": uuidv4(),
      "text": "",
      "group": "",
      "isChecked": false
    })
      .then(getTasks().then(updateTasks));

  /////////////////////////////

  const deleteTask = id =>
    api.delete(`/tasks/${id}`)
      .then(getTasks().then(updateTasks))

  /////////////////////////////

  const toggleTask = (id, state) =>
    api.patch(
      `/tasks/${id}`,
      { isChecked: !state })
      .then(getTasks().then(updateTasks))

  /////////////////////////////

  const renameTask = (id, value) =>
    api.patch(
      `/tasks/${id}`,
      { text: value })
      .then(getTasks().then(updateTasks));

  /////////////////////////////

  const selectAll = node =>
    map(item => (
      api.patch(`/tasks/${item.id}`, { isChecked: true })
    ))(node);


  /////////////////////////////

  const selectNone = node =>
    map(item => (
      api.patch(`/tasks/${item.id}`, { isChecked: false })
    ))(node);

  /////////////////////////////

  const tasksRemainingCount = node =>
    reduce((a, item) =>
      a + !item.isChecked,
      0)(values(node));

  /////////////////////////////

  const allSelected = node => {
    let one = reduce((a, task) => a + task.isChecked, 0)(values(node));
    let two = keys(node).length;
    return one === two;
  }

  /////////////////////////////

  return {
    getTasks,
    createTask,
    createTaskGroup,
    deleteTask,
    toggleTask,
    renameTask,
    selectAll,
    selectNone,
    tasksRemainingCount,
    allSelected
  }
}

export default useTask;