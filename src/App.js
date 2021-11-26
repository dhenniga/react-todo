import React from "react";
import "./App.css";
import { values, reduce } from "ramda";
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
import { useConfig, useTasks } from './hooks/useTaskHook'

///////////////////////

const App = () => {

  ///////////////////////

  const { isDarkTheme } = useConfig()
  const { tasks } = useTasks()

  ///////////////////////

  const {
    createTask,
    createTaskGroup,
    tasksRemainingCount,
    selectAll,
    selectNone,
    toggleTheme
  } = useTask()


  ///////////////////////

  return (
    <>
      {tasks &&

        <ThemeProvider theme={
          !!+isDarkTheme
            ? light
            : dark
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
                isDarkTheme={!!+isDarkTheme}
                handleClick={() => toggleTheme(isDarkTheme)}
              />

            </Header>

            <AppBody>

              {
                mapObjectToValues((node, rootKey) => {

                  console.log(tasks)
                  console.log(node)

                  return (

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
                          note,
                          timeDisplayType,
                          lastUpdated
                        }, key) =>

                          <Task
                            key={key}
                            id={id}
                            text={text}
                            isChecked={!!+isChecked}
                            dateCreated={dateCreated}
                            dateToBeCompleted={dateToBeCompleted}
                            taskCompletedTime={taskCompletedTime}
                            quantity={quantity}
                            note={note}
                            timeDisplayType={timeDisplayType}
                            lastUpdated={lastUpdated}
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
                  )
                }

                )(tasks)
              }

            </AppBody>

          </Container>

        </ThemeProvider>
      }
    </>

  );

};

export default App;
