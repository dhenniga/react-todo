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
    setThemeState(state)
    toggleTheme(state)
  }

  return <ThemeProvider theme={themeState ? dark : light}>

    <div style={{
      display: "block",
      width: "100vw",
      margin: "0px auto",
      height: "100vh",
      backgroundColor: themeState ? 'black' : '#f3f7fa',
      transition: 'background-color 0.3s cubic-bezier(0.5, 0.2, 0, 1)'

    }}>

      <SomeFile handleThemeChange={handleThemeChange} />

    </div>

  </ThemeProvider>

}

export default App;
