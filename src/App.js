import React, { useState, useEffect } from "react"
import "./App.css"
import { ThemeProvider } from "styled-components"
import light from "./themes/light.theme"
import dark from "./themes/dark.theme"
import { useConfig } from './hooks/useTaskHook'
import 'react-grid-layout/css/styles.css'
import "react-resizable/css/styles.css"
import SomeFile from "./SomeFile"
import useTask from "./useTask"

///

const App = () => {

  const { isDarkTheme } = useConfig()
  const { toggleTheme } = useTask()

  const [themeState, setThemeState] = useState(isDarkTheme)
  useEffect(() => setThemeState(isDarkTheme), [isDarkTheme])

  const handleThemeChange = () => {
    const state = !themeState
    console.log(state)
    setThemeState(state)
    toggleTheme(state)
  }

  return <ThemeProvider theme={themeState ? dark : light}>

    <SomeFile handleThemeChange={handleThemeChange} />

  </ThemeProvider>

}

export default App;
