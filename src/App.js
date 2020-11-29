import React, { useEffect, useState } from "react";
import "./App.css";
import { values } from "ramda";
import Task from "./task/task";
import TaskGroup from "./task-group/task-group";
import { mapObjectToValues } from "./app.service";
import { AddTask, ItemsRemaining } from "./app.styled";
import useTask from "./useTask";

///////////////////////

const App = () => {

  const [tasks, updateTasks] = useState();

  const {
    getTasks,
    createTask,
    createTaskGroup,
    tasksRemainingCount,
    toggleTask,
    deleteTask
  } = useTask();

  useEffect(() => {
    getTasks().then(updateTasks);
  }, []);

  const handleToggleChange = (id, value) =>
    toggleTask(id, value)
      .then(getTasks().then(updateTasks))

  const handleDeleteTask = (id, value) =>
    deleteTask(id)
      .then(getTasks().then(updateTasks))

  const handleCreateTask = rootKey =>
    createTask(rootKey)
      .then(getTasks().then(updateTasks))

  return (

    <div className="App">

      {
        mapObjectToValues((node, rootKey) =>

          <TaskGroup
            key={rootKey}
            title={rootKey}
            node={node}>

            {
              mapObjectToValues(({ id, text, isChecked }, key) =>

                <Task
                  key={key}
                  id={id}
                  text={text}
                  isChecked={isChecked}
                  onToggleChange={handleToggleChange}
                  onDeleteTask={handleDeleteTask}
                />

              )(node)
            }

            <AddTask
              onClick={() => handleCreateTask(rootKey)}>
              +
              </AddTask>

            <ItemsRemaining>
              {tasksRemainingCount(values(node))} items left
              </ItemsRemaining>

          </TaskGroup>

        )(tasks)
      }

      <button onClick={() => createTaskGroup()}>Add Task Group</button>

    </div>

  );
};

export default App;
