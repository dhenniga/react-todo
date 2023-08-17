import React from 'react'
import { Container, AppBody } from "./app.styled"
import AppHeader from './app-header'
import { mapObjectToValues } from "./app.service"
import Task from "./task/task"
import ArchivedTask from "./archived-task/archived-task"
import TaskGroup from "./task-group/task-group"
import useTask from "./useTask"

const SomeFile = ({
  handleThemeChange,
  setIsArchivedList,
  isArchivedList,
  activeTasks,
  archivedTasks
}) => {

  const { selectAll, selectNone } = useTask()
  const tasks = isArchivedList ? archivedTasks : activeTasks

  return <Container>

    <AppHeader
      isArchivedList={isArchivedList}
      setIsArchivedList={setIsArchivedList}
      handleThemeChange={handleThemeChange}
    />

    {tasks &&
      <AppBody>
        {
          mapObjectToValues((node, rootKey) =>

            <TaskGroup
              key={rootKey}
              rootKey={rootKey}
              title={rootKey}
              isArchivedList={isArchivedList}
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
                }, key) => {
                  return !isArchivedList
                    ? <Task
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
                    : <ArchivedTask
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
                }
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