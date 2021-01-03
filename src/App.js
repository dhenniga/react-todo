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
import ToggleThemeButton from "./buttons/toggle-theme";

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

          <ToggleThemeButton
            isDarkTheme={prop("isDarkTheme", config)}
            handleClick={() => toggleTheme(prop("isDarkTheme", config))}
          />

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
