import React from "react"
import {
    AddGroupButton,
    Header,
    AppTitle
} from "./app.styled"
import ToggleThemeButton from "./buttons/toggle-theme"
import { useConfig } from './hooks/useTaskHook'
import PreGroup from './task-group/pre-task-group'
import ReactDOM from 'react-dom'
import 'react-grid-layout/css/styles.css'
import "react-resizable/css/styles.css"

///////////////////////

const AppHeader = ({ handleThemeChange }) => {

    const { isDarkTheme } = useConfig()

    ///////////////////////

    return (

        <Header>

            <AppTitle>
                TaskBoard
            </AppTitle>

            <AddGroupButton
                // onClick={() => createTaskGroup()}>
                onClick={() => {
                    const title = React.createElement(PreGroup, null, null)
                    document.getElementById('modal').style.display = 'grid'
                    ReactDOM.render(
                        title,
                        document.getElementById('modal')
                    )
                }}>
                +
            </AddGroupButton>

            <ToggleThemeButton
                isDarkTheme={!!+isDarkTheme}
                handleClick={handleThemeChange}
            />

        </Header>
    );

};

export default AppHeader;
