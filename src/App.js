import React, { useEffect, useState } from "react";
import "./App.css";
import { values, reduce, prop } from "ramda";
import Task from "./task/task";
import TaskGroup from "./task-group/task-group";
import { mapObjectToValues } from "./app.service";
import {
  Container,
  AddTask,
  AddGroupButton,
  ItemsRemaining,
  Header,
  TaskGroupFooter,
  AppBody,
  AppTitle
} from "./app.styled";
import useTask from "./useTask";
import { ThemeProvider } from "styled-components";
import light from "./themes/light.theme";
import dark from "./themes/dark.theme";

///////////////////////

const App = () => {

  ///////////////////////

  const [tasks, updateTasks] = useState();
  const [config, updateConfig] = useState();

  ///////////////////////

  const {
    getTasks,
    getConfig,
    createTask,
    createTaskGroup,
    tasksRemainingCount,
    selectAll,
    selectNone,
    toggleTheme
  } = useTask(updateTasks, updateConfig);

  ///////////////////////

  useEffect(() => {
    getTasks().then(updateTasks);
    getConfig().then(updateConfig);
  }, []);

  ///////////////////////

  return (

    <ThemeProvider theme={
      prop("isDarkTheme", config)
        ? dark
        : light
    }>

      <Container>

        <Header>

          <AppTitle>
            TaskBoard
        </AppTitle>

          <AddGroupButton
            onClick={() => createTaskGroup()}>
            +
        </AddGroupButton>

          <button
            style={{
              backgroundColor: "transparent",
              outline: "none",
              border: "0px",
              color: "white",
              float: "right",
              padding: "0px",
              margin: "0px 20px",
              display: "grid",
              height: "26px",
              alignItems: "center",
              transition: "all 0.5s cubic-bezier(0.5, 0.2, 0, 1)",
              transform: prop("isDarkTheme", config) ? "rotate(0deg)" : "rotate(180deg)"
            }}
            onClick={() => {
              toggleTheme(prop("isDarkTheme", config))
            }}>
            <svg
              width="20"
              height="20">
              <path
                d="M10 1.667c4.595 0 8.333 3.738 8.333 8.333S14.595 18.333 10 18.333 1.667 14.595 1.667 10 5.405 1.667 10 1.667zM10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm0 3.333a6.667 6.667 0 000 13.334z"
                fill="white"
              />
            </svg>
          </button>

        </Header>

        <AppBody>

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
                    dateToBeCompleted,
                    taskCompletedTime,
                    quantity,
                    note
                  }, key) =>

                    <Task
                      key={key}
                      id={id}
                      text={text}
                      isChecked={isChecked}
                      updateTasks={updateTasks}
                      dateCreated={dateCreated}
                      dateToBeCompleted={dateToBeCompleted}
                      taskCompletedTime={taskCompletedTime}
                      quantity={quantity}
                      note={note}
                    />

                  )(node)
                }

                <TaskGroupFooter>

                  <AddTask
                    disabled={reduce((a, item) => a + !item.text, 0)(values(node))}
                    onClick={() => createTask(rootKey)}>
                    +
                </AddTask>

                  <ItemsRemaining>
                    {tasksRemainingCount(node)} items left
                </ItemsRemaining>

                </TaskGroupFooter>

              </TaskGroup>

            )(tasks)
          }

        </AppBody>

      </Container>

    </ThemeProvider>

  );

};

export default App;
