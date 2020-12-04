import axios from "axios";
import { converter } from "./app.service";
import { v4 as uuidv4 } from 'uuid';
import { map, reduce, values, keys } from "ramda";
import moment from "moment";

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
      "isChecked": false,
      "dateCreated": moment(),
      "dateToBeCompleted": moment().add('minutes', 1)
    })
      .then(getTasks().then(updateTasks));

  /////////////////////////////

  const createTaskGroup = () =>
    api.post(`/tasks/`, {
      "id": uuidv4(),
      "text": "",
      "group": "",
      "isChecked": false,
      "dateCreated": moment(),
      "dateToBeCompleted": moment().add('minutes', 1)
    })
      .then(getTasks().then(updateTasks));

  /////////////////////////////

  const deleteTask = id =>
    api.delete(`/tasks/${id}`)
      .then(getTasks().then(updateTasks));

  /////////////////////////////

  const toggleTask = (id, state) =>
    api.patch(
      `/tasks/${id}`,
      { isChecked: !state })
      .then(getTasks().then(updateTasks));

  /////////////////////////////

  const renameTask = (id, value) =>
    api.patch(
      `/tasks/${id}`,
      { text: value })
      .then(getTasks().then(updateTasks));

  /////////////////////////////

  const renameGroup = (node, value) => {
    map(item =>
      api.patch(
        `/tasks/${item.id}`,
        { group: value })
    )(node);
    getTasks().then(updateTasks);
  }

  /////////////////////////////

  const selectAll = node =>
    map(item =>
      api.patch(`tasks/${item.id}`,
        { isChecked: true })
    )(node);

  /////////////////////////////

  const selectNone = node =>
    map(item =>
      api.patch(`tasks/${item.id}`,
        { isChecked: false })
    )(node);

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

  const calculateRemainingPercentage = (
    dateCreated,
    dateToBeCompleted
  ) => {
    const startDate = new Date(dateCreated);
    const endDate = new Date(dateToBeCompleted);
    return Math.round((new Date() - startDate) / (endDate - startDate) * 100);
  }

  const updateDateToBeCompleted = (id, date) =>
    api.patch(
      `/tasks/${id}`,
      { dateToBeCompleted: date })
      .then(getTasks().then(updateTasks));

  /////////////////////////////

  return {
    getTasks,
    createTask,
    createTaskGroup,
    deleteTask,
    toggleTask,
    renameTask,
    renameGroup,
    selectAll,
    selectNone,
    tasksRemainingCount,
    allSelected,
    calculateRemainingPercentage,
    updateDateToBeCompleted
  }

}

/////////////////////////////

export default useTask;