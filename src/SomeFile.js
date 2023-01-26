import React, { useState } from 'react'
import { Container, AppBody } from "./app.styled"
import AppHeader from './app-header'
import { mapObjectToValues } from "./app.service"
import { 
  useActiveTasks, 
  // useArchivedTasks 
} from './hooks/useTaskHook'
import Task from "./task/task"
// import ArchivedTask from './archived-task/archived-task'
import TaskGroup from "./task-group/task-group"
import useTask from "./useTask"


const SomeFile = ({ handleThemeChange }) => {

  const { selectAll, selectNone } = useTask()
  const { activeTasks } = useActiveTasks()
  // const { archivedTasks } = useArchivedTasks()
  const [blob, setBlob] = useState(false)
  // const tasks = blob ? archivedTasks : activeTasks

  // console.log(blob);

  return <Container>

    <AppHeader
      blob={blob}
      setBlob={setBlob}
      handleThemeChange={handleThemeChange}
    />

    {activeTasks &&
      <AppBody>
        {
          mapObjectToValues((node, rootKey) =>

            <TaskGroup
              key={rootKey}
              rootKey={rootKey}
              title={rootKey}
              node={node}
              onSelectAll={selectAll}
              onSelectNone={selectNone}
              isExpanded={!!+Object.values(node)[0].isExpanded}>

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
                  timeDisplayType,
                  status
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
                    status={status}
                  />
                )(node)
              }

            </TaskGroup>

          )(activeTasks)
        }

      </AppBody>
    }

  </Container>
}

export default SomeFile