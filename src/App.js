import React from "react"
import "./App.css"
import { ThemeProvider } from "styled-components"
import light from "./themes/light.theme"
import dark from "./themes/dark.theme"
import { useConfig } from './hooks/useTaskHook'
import 'react-grid-layout/css/styles.css'
import "react-resizable/css/styles.css"
import SomeFile from "./SomeFile"

///

const App = () => {

  const { isDarkTheme } = useConfig()

  return <ThemeProvider theme={!!+isDarkTheme ? light : dark}>

    <SomeFile />

  </ThemeProvider>

}

export default App;
