import React, { useState, useEffect, version } from 'react'
import './App.css'
import { ThemeProvider } from 'styled-components'
import light from './themes/light.theme'
import dark from './themes/dark.theme'
import { useConfig } from './hooks/useTaskHook'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import SomeFile from './SomeFile'
import useTask from './useTask'
import { AppContainer } from './app.styled'


///

const App = () => {
  
  useEffect(() => {
    console.log(`React: ${version}`)
  }, [])

  const { isDarkTheme } = useConfig()
  const { toggleTheme } = useTask()

  const [themeState, setThemeState] = useState(isDarkTheme)
  useEffect(() => setThemeState(isDarkTheme), [isDarkTheme])

  const handleThemeChange = () => {
    const state = !themeState
    setThemeState(state)
    toggleTheme(state)
  }

  return <ThemeProvider theme={themeState ? dark : light}>

    <AppContainer
      themeState={themeState}>

      <SomeFile handleThemeChange={handleThemeChange} />

    </AppContainer>

  </ThemeProvider>

}

export default App
