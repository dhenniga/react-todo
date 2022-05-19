import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { map, reduce, values, keys } from "ramda";
import qs from 'qs';

const baseUrl = "http://www.fluidmotion.ie/taskboard/api/"

const useTask = () => {

  /////////////////////////////

  const createTask = rootKey =>
    axios.post(baseUrl + `create-task.php`,
      qs.stringify({
        id: uuidv4(),
        taskText: "",
        taskGroup: rootKey,
        dateCreated: new Date(),
        dateToBeCompleted: "",
        taskCompletedTime: "",
        quantity: "",
        note: "",
        isChecked: false
      })
    )

  /////////////////////////////

  const createTaskGroup = title =>
    axios.post(baseUrl + `create-task-group.php`,
      qs.stringify({
        id: uuidv4(),
        taskText: "",
        taskGroup: title,
        dateCreated: new Date(),
        dateToBeCompleted: "",
        taskCompletedTime: "",
        quantity: "",
        note: "",
        isChecked: false
      },
        {
          parseArrays: false
        })
    )

  /////////////////////////////

  const toggleTheme = state =>
    axios.post(baseUrl + `toggle-theme.php`,
      qs.stringify({ isDarkTheme: state ? 0 : 1 })
    )

  /////////////////////////////

  const saveGridLayout = gridLayout => {
    return axios.post(baseUrl + `save-grid-layout.php`,
      qs.stringify({ gridLayout })
    )
  }

  /////////////////////////////

  const deleteGroup = taskGroup =>
    axios.post(baseUrl + `delete-group.php`,
      qs.stringify({ taskGroup })
    )

  /////////////////////////////

  const deleteTask = id =>
    axios.post(baseUrl + `delete-task.php`,
      qs.stringify({ id })
    )


  /////////////////////////////

  const renameTask = (id, value) =>
    axios.post(baseUrl + `rename-task.php`,
      qs.stringify({ id, value })
    )

  /////////////////////////////

  const toggleTask = (id, state) =>
    axios.post(baseUrl + `toggle-task.php`,
      qs.stringify({ id, state })
    )

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
    axios.post(baseUrl + `change-quantity.php`,
      qs.stringify({ id, value })
    )

  /////////////////////////////

  const updateNote = (id, value) =>
    axios.post(baseUrl + `update-note.php`,
      qs.stringify({ id, value })
    )

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
      axios.post(baseUrl + `rename-group.php`,
        qs.stringify({
          id: item.id,
          taskGroup: value
        })
      )
    )(node)
  }

  /////////////////////////////

  const selectAll = taskGroup =>
    axios.post(baseUrl + `select-all.php`,
      qs.stringify({ taskGroup })
    )

  /////////////////////////////

  const selectNone = taskGroup =>
    axios.post(baseUrl + `select-none.php`,
      qs.stringify({ taskGroup })
    )

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

  const updateDateToBeCompleted = (id, date, type) => {
    return (axios.post(`update-date-to-be-completed.php`,
      qs.stringify({ id, date, type })
    ))
  }

  /////////////////////////////

  return {
    // getTasks,
    // getConfig,
    createTask,
    createTaskGroup,
    deleteTask,
    deleteGroup,
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
    toggleTheme,
    saveGridLayout
  }

}

/////////////////////////////

export default useTask;