import axios from "axios";
import { converter } from "./app.service";
import { v4 as uuidv4 } from 'uuid';
import { map, reduce, values, keys } from "ramda";
import qs from 'qs';

const useTask = (updateTasks, updateConfig) => {

  /////////////////////////////

  const getConfig = () =>
    axios.get("api/get-config.php")
      .then(({ data }) => data);

  /////////////////////////////

  const getTasks = () =>
    axios.get("api/get-tasks.php")
      .then(({ data }) => converter(data));

  /////////////////////////////

  const createTask = rootKey =>
    axios.post("api/create-task.php",
      qs.stringify({
        id: uuidv4(),
        taskText: "",
        taskGroup: rootKey,
        dateCreated: new Date(),
        dateToBeCompleted: "",
        taskCompletedTime: "",
        quantity: "",
        note: "",
        isChecked: false,
      },
        { parseArrays: false }
      )
    ).then(getTasks().then(updateTasks));

  /////////////////////////////

  const createTaskGroup = () =>
    axios.post(`api/create-task-group.php`,
      qs.stringify({
        id: uuidv4(),
        taskText: "",
        taskGroup: "",
        dateCreated: new Date(),
        dateToBeCompleted: "",
        taskCompletedTime: "",
        quantity: "",
        note: "",
        isChecked: false
      },
        { parseArrays: false }
      )
    ).then(getTasks().then(updateTasks));

  /////////////////////////////

  const toggleTheme = state =>
    axios.post(`api/toggle-theme.php`,
      qs.stringify({ isDarkTheme: state ? 0 : 1 })
    ).then(getConfig().then(updateConfig));

  /////////////////////////////

  const deleteTask = id =>
    axios.post(`api/delete-task.php`,
      qs.stringify({ id })
    ).then(getTasks().then(updateTasks));

  /////////////////////////////

  const renameTask = (id, value) =>
    axios.post(`api/rename-task.php`,
      qs.stringify({ id, value })
    ).then(getTasks().then(updateTasks));

  /////////////////////////////

  const toggleTask = (id, state) =>
    axios.post(`api/toggle-task.php`,
      qs.stringify({ id, state })
    ).then(getTasks().then(updateTasks));

  /////////////////////////////

  // const toggleTask = (id, state) =>
  //   api.patch(
  //     `/tasks/${id}`,
  //     {
  //       isChecked: !state,
  //       taskCompletedTime: !state
  //         ? new Data()
  //         : ""
  //     })
  //     .then(getTasks().then(updateTasks));


  /////////////////////////////

  const changeQuantity = (id, value) =>
    axios.post(`api/change-quantity.php`,
      qs.stringify({ id, value })
    ).then(getTasks().then(updateTasks));

  /////////////////////////////

  const updateNote = (id, value) =>
    axios.post(`api/update-note.php`,
      qs.stringify({ id, value })
    ).then(getTasks().then(updateTasks));

  /////////////////////////////

  // const renameGroup = (node, value) => {
  //   map(item =>
  //     api.patch(
  //       `/tasks/${item.id}`,
  //       { group: value })
  //   )(node);
  //   getTasks().then(updateTasks);
  // }

  const renameGroup = (node, value) => {
    map(item =>
      axios.post(
        `api/rename-group.php`,
        qs.stringify({
          id: item.id,
          taskGroup: value
        })
      )
    )(node);
    getTasks().then(updateTasks);
  }

  /////////////////////////////

  const selectAll = taskGroup =>
    axios.post(`api/select-all.php`,
      qs.stringify({ taskGroup })
    ).then(getTasks().then(updateTasks));

  /////////////////////////////

  const selectNone = taskGroup =>
    axios.post(`api/select-none.php`,
      qs.stringify({ taskGroup })
    ).then(getTasks().then(updateTasks));

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
    const marp = (new Date() - startDate) / (endDate - startDate) * 100;
    return marp.toFixed(2);
  }

  /////////////////////////////

  const updateDateToBeCompleted = (id, date) =>
    axios.post(`api/update-date-to-be-completed.php`,
      qs.stringify({ id, date })
    ).then(getTasks().then(updateTasks));

  /////////////////////////////

  return {
    getTasks,
    getConfig,
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
    updateDateToBeCompleted,
    changeQuantity,
    updateNote,
    toggleTheme
  }

}

/////////////////////////////

export default useTask;