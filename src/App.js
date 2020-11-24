import React, { useEffect } from "react";
import "./App.css";
import { prop } from "ramda";
import Task from "./task/task";
import TaskGroup from "./task-group/task-group";
import { mapObjectToValues } from "./app.service";
import { AddTask, DeleteButton } from "./app.styled";
import useTask from "./useTask";

///////////////////////

const App = () => {

  const {
    getTasks,
    createTask,
    createTaskGroup,
    deleteTask,
    taskData
  } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  return (

    <div className="App">

      {
        mapObjectToValues((node, rootKey) => {

          return (
            <TaskGroup
              key={rootKey}
              title={rootKey}>

              {
                mapObjectToValues((item, key) => {

                  return (

                    <div style={{ position: "relative" }}>

                      <Task
                        key={key}
                        id={prop("id", item)}
                        text={prop("text")(item)}
                        isChecked={prop("isChecked", item)}
                      />

                      <DeleteButton
                        onClick={() => deleteTask(prop("id", item))}>
                        x
                          </DeleteButton>

                    </div>

                  )
                })(node)
              }

              <AddTask
                onClick={() => createTask(rootKey)}>
                +
            </AddTask>

            </TaskGroup>

          )
        })(taskData)
      }

      <button onClick={() => createTaskGroup()}>Add Task Group</button>

    </div>

  );
};

export default App;
