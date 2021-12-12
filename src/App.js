import React, { useState, useEffect } from "react"
import "./App.css"
import { values, reduce, type } from "ramda"
import Task from "./task/task"
import TaskGroup from "./task-group/task-group"
import { mapObjectToValues } from "./app.service"
import {
  Container,
  AddTask,
  AddGroupButton,
  ItemsRemaining,
  Header,
  TaskGroupFooter,
  AppBody,
  AppTitle
} from "./app.styled"
import useTask from "./useTask"
import { ThemeProvider } from "styled-components"
import light from "./themes/light.theme"
import dark from "./themes/dark.theme"
import ToggleThemeButton from "./buttons/toggle-theme"
import { useConfig, useTasks } from './hooks/useTaskHook'
import PreGroup from './task-group/pre-task-group'
import ReactDOM from 'react-dom'
import GridLayout, { WidthProvider } from "react-grid-layout"
import 'react-grid-layout/css/styles.css'
import "react-resizable/css/styles.css"
import qs from 'qs'

const NewGridLayout = WidthProvider(GridLayout)

///////////////////////

const App = () => {

  ///////////////////////

  const { isDarkTheme, gridLayout } = useConfig()
  const { tasks } = useTasks()

  ///////////////////////

  const {
    createTask,
    createTaskGroup,
    tasksRemainingCount,
    selectAll,
    selectNone,
    toggleTheme,
    saveGridLayout
  } = useTask()

  ///////////////////////

  return (
    <>

      {tasks && gridLayout &&

        <ThemeProvider theme={
          !!+isDarkTheme
            ? light
            : dark
        }>

          <Container>

            <Header>

              <AppTitle>
                A&amp;D Tasks
              </AppTitle>

              <AddGroupButton
                // onClick={() => createTaskGroup()}>
                onClick={() => {
                  const title = React.createElement(PreGroup, null, null)
                  document.getElementById('marp').style.display = 'inline'
                  ReactDOM.render(
                    title,
                    document.getElementById('marp')
                  )
                }}>
                +
              </AddGroupButton>

              <ToggleThemeButton
                isDarkTheme={!!+isDarkTheme}
                handleClick={() => toggleTheme(isDarkTheme)}
              />

            </Header>


            <AppBody>

              <div id='marp' style={{ display: 'none' }}></div>

              {
                gridLayout &&
                <NewGridLayout
                  layout={JSON.parse(gridLayout)}
                  isResizable={false}
                  onDragStop={layout => saveGridLayout(JSON.stringify(layout))}
                  rowHeight={60}
                  cols={1}
                >

                  {
                    mapObjectToValues((node, rootKey) => {

                      return (

                        <div
                          key={rootKey}>

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
                                timeDisplayType
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

                        </div>
                      )
                    }

                    )(tasks)
                  }
                </NewGridLayout>
              }

            </AppBody>

          </Container>

        </ThemeProvider>
      }

    </>
  );

};

export default App;
