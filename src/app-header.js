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

const AppHeader = ({ 
    setColumnNum, 
    setIsEditModeOn,
    isEditModeOn
}) => {

    ///////////////////////

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

            <select
                onChange={e => setColumnNum(e.target.value)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>

            <button onPointerDown={() => setIsEditModeOn(!isEditModeOn)}>
                edit
            </button>

        </Header>
    );

};

export default AppHeader;
