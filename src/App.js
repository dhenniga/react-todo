import React, { useEffect, useState } from "react";
import "./App.css";
import { values, reduce } from "ramda";
import Task from "./task/task";
import TaskGroup from "./task-group/task-group";
import { mapObjectToValues } from "./app.service";
import {
  AddTask,
  AddGroupButton,
  ItemsRemaining
} from "./app.styled";
import useTask from "./useTask";

///////////////////////

const App = () => {

  const [tasks, updateTasks] = useState();

  const {
    getTasks,
    createTask,
    createTaskGroup,
    tasksRemainingCount,
    selectAll,
    selectNone
  } = useTask(updateTasks);

  useEffect(() => {
    getTasks().then(updateTasks);
  }, []);

  return (

    <div className="App">

      <div style={{
        width: "calc(100% - 40px)",
        height: "fit-content",
        padding: "20px"
      }}>React TODO Application</div>

      {
        mapObjectToValues((node, rootKey) =>

          <TaskGroup
            key={rootKey}
            title={rootKey}
            node={node}
            onSelectAll={node => selectAll(node)}
            onSelectNone={node => selectNone(node)}>

            {
              mapObjectToValues(({
                id,
                text,
                isChecked,
                dateCreated,
                dateToBeCompleted
              }, key) =>

                <Task
                  key={key}
                  id={id}
                  text={text}
                  isChecked={isChecked}
                  updateTasks={updateTasks}
                  dateCreated={dateCreated}
                  dateToBeCompleted={dateToBeCompleted}
                />

              )(node)
            }

            <div
              style={{
                height: "40px",
                display: "grid",
                gridTemplateColumns: "max-content 1fr",
                alignItems: "center"
              }}>

              <AddTask
                disabled={reduce((a, item) => a + !item.text, 0)(values(node))}
                onClick={() => createTask(rootKey)}>
                +
            </AddTask>

              <ItemsRemaining>
                {tasksRemainingCount(node)} items left
              </ItemsRemaining>

            </div>

          </TaskGroup>

        )(tasks)
      }

      <AddGroupButton
        onClick={() => createTaskGroup()}>
        Add Task Group
      </AddGroupButton>

    </div>

  );
};

export default App;
