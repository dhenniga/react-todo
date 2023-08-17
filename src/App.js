import React, { useState, useEffect } from 'react'
import './App.css'
import { ThemeProvider } from 'styled-components'
import light from './themes/light.theme'
import dark from './themes/dark.theme'
import { useConfig } from './hooks/useTaskHook'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import SomeFile from './SomeFile'
import useTask from './useTask'
import { useActiveTasks, useArchivedTasks } from './hooks/useTaskHook'
import { AppContainer } from './app.styled'


///

const App = () => {

  const { isDarkTheme } = useConfig()
  const { toggleTheme } = useTask()
  const { activeTasks } = useActiveTasks()
  const { archivedTasks } = useArchivedTasks()

  const [themeState, setThemeState] = useState(isDarkTheme)
  const [isArchivedList, setIsArchivedList] = useState(false)
  useEffect(() => setThemeState(isDarkTheme), [isDarkTheme])

  const handleThemeChange = () => {
    const state = !themeState
    setThemeState(state)
    toggleTheme(state)
  }

  return <ThemeProvider theme={themeState ? dark : light}>

    <AppContainer
      themeState={themeState}>

      <SomeFile
        activeTasks={activeTasks}
        archivedTasks={archivedTasks}
        setIsArchivedList={setIsArchivedList}
        isArchivedList={isArchivedList}
        handleThemeChange={handleThemeChange} />

    </AppContainer>

  </ThemeProvider>

}

export default App
