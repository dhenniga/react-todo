import React, { useState } from "react"
import "./App.css"
import Task from "./task/task"
import TaskGroup from "./task-group/task-group"
import { mapObjectToValues } from "./app.service"
import {
  Container,
  AppBody
} from "./app.styled"
import useTask from "./useTask"
import { ThemeProvider } from "styled-components"
import light from "./themes/light.theme"
import dark from "./themes/dark.theme"
import { useConfig, useTasks } from './hooks/useTaskHook'
import GridLayout, { WidthProvider } from "react-grid-layout"
import AppHeader from './app-header'
import 'react-grid-layout/css/styles.css'
import "react-resizable/css/styles.css"
import styled from 'styled-components'
// import { map, pipe, mergeAll } from 'ramda'
import { initializeApp } from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging"

///

const NewGridLayout = WidthProvider(GridLayout)

///

const Marper = styled(NewGridLayout)`
  transition: all 0.3s cubic-bezier(0.5, 0.2, 0, 1);
`

///

const firebaseConfig = {
  apiKey: "AIzaSyBP1q266UOuYgRYDkjWtQLn-MxwW2Xkdow",
  authDomain: "taskboard-4780f.firebaseapp.com",
  projectId: "taskboard-4780f",
  storageBucket: "taskboard-4780f.appspot.com",
  messagingSenderId: "319293178748",
  appId: "1:319293178748:web:ba2af71b08aa36cdd95af9"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app)

getToken(messaging, {
  vapidKey: 'BG4d7QJgGjgsOT_K9ZW6JjofrIGtiNkHVAX9FOpPvr1mjEXqQmz8UOhVxRddYK1KsMOTEy1E3jeWbLdIsmphpdM'
}).then((currentToken) => {
  if (currentToken) {
    console.log(currentToken)
  } else {
    console.log('No registration token available. Request permission to generate one.')
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err)
})

///////////////////////

const App = () => {

  ///////////////////////

  const { isDarkTheme, gridLayout } = useConfig()
  const { tasks } = useTasks()

  ///////////////////////

  const {
    selectAll,
    selectNone,
    saveGridLayout
  } = useTask()

  ///////////////////////

  const initialLayout = gridLayout && JSON.parse(gridLayout)
  const [columnNum, setColumnNum] = useState(1)
  const [isEditModeOn, setIsEditModeOn] = useState(false)
  // const [parsedLayout, setParsedLayout] = useState(initialLayout)

  ///////////////////////

  // const marp33 = initialLayout && map(item => { return { ...item, ...item.h = 18 } })(initialLayout)
  // const marp2 = initialLayout && pipe(map(o => { return { [o.i]: o.h } }), mergeAll)(initialLayout)

  // useEffect(() => {
  //   isEditModeOn
  //     ? setParsedLayout(initialLayout)
  //     : setParsedLayout(marp33)
  // }, [isEditModeOn])

  ///////////////////////

  tasks && console.log(tasks)

  return (

    <ThemeProvider theme={
      !!+isDarkTheme
        ? light
        : dark
    }>

      <Container>

        <AppHeader
          setIsEditModeOn={setIsEditModeOn}
          isEditModeOn={isEditModeOn}
          setColumnNum={setColumnNum}
        />

        {tasks && gridLayout &&

          <AppBody
            isEditModeOn={isEditModeOn}>

            {/* whats' this */}
            <div id='marp' style={{ display: 'none' }}></div>

            {gridLayout &&

              <Marper
                layout={initialLayout}
                isResizable={false}
                isDraggable={isEditModeOn}
                onDragStop={layout => saveGridLayout(JSON.stringify(layout))}
                rowHeight={60}
                cols={columnNum}>

                {
                  mapObjectToValues((node, rootKey) =>

                    <div
                      key={rootKey}
                      style={{
                        transition: '0.3s cubic-bezier(0.5, 0.2, 0, 1)',
                        transitionProperty: 'width, height',
                        backgroundColor: 'rgba(255,255,0,0.5)'
                      }}>

                      <TaskGroup
                        isEditModeOn={isEditModeOn}
                        rootKey={rootKey}
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

                      </TaskGroup>

                    </div>

                  )(tasks)

                }

              </Marper>

            }

          </AppBody>

        }

      </Container>

    </ThemeProvider>

  );

};

export default App;
