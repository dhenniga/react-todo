import React from 'react'
import { Container, AppBody } from "./app.styled"
import AppHeader from './app-header'
import { mapObjectToValues } from "./app.service"
import { useTasks } from './hooks/useTaskHook'
import Task from "./task/task"
import TaskGroup from "./task-group/task-group"
import useTask from "./useTask"


const SomeFile = ({ handleThemeChange }) => {

  const { selectAll, selectNone } = useTask()
  const { tasks } = useTasks()

  return <Container>

    <AppHeader handleThemeChange={handleThemeChange} />

    {tasks &&
      <AppBody>
        {
          mapObjectToValues((node, rootKey) =>

            <TaskGroup
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

          )(tasks)
        }

      </AppBody>
    }

  </Container>
}

export default SomeFile