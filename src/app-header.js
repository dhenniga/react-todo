import React from "react"
import {
    AddGroupButton,
    Header,
    AppTitle
} from "./app.styled"
import useTask from "./useTask"
import ToggleThemeButton from "./buttons/toggle-theme"
import { useConfig } from './hooks/useTaskHook'
import PreGroup from './task-group/pre-task-group'
import ReactDOM from 'react-dom'
import 'react-grid-layout/css/styles.css'
import "react-resizable/css/styles.css"

///////////////////////

const AppHeader = () => {

    const { isDarkTheme } = useConfig()
    const { toggleTheme } = useTask()

    ///////////////////////

    return (

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
    );

};

export default AppHeader;
