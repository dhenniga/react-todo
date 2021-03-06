import React, { useEffect, useState } from "react";
import "./App.css";
import { values, reduce } from "ramda";
import Task from "./task/task";
import TaskGroup from "./task-group/task-group";
import { mapObjectToValues } from "./app.service";
import {
  Container,
  AddTask,
  AddGroupButton,
  ItemsRemaining,
  Header,
  TaskGroupFooter,
  AppBody,
  AppTitle
} from "./app.styled";
import useTask from "./useTask";

///////////////////////

const App = () => {

  const [tasks, updateTasks] = useState();

  ///////////////////////

  const {
    getTasks,
    createTask,
    createTaskGroup,
    tasksRemainingCount,
    selectAll,
    selectNone
  } = useTask(updateTasks);

  ///////////////////////

  useEffect(() => {
    getTasks().then(updateTasks);
  }, []);

  ///////////////////////

  return (

    <Container>

      <Header>

        <AppTitle>
          TaskBoard
        </AppTitle>

        <AddGroupButton
          onClick={() => createTaskGroup()}>
          +
        </AddGroupButton>

      </Header>

      <AppBody>

        {
          mapObjectToValues((node, rootKey) =>

            <TaskGroup
              key={rootKey}
              title={rootKey}
              node={node}
              onSelectAll={node => selectAll(node)}
              onSelectNone={node => selectNone(node)}>

              {
                mapObjectToValues(({
                  id,
                  text,
                  isChecked,
                  dateCreated,
                  dateToBeCompleted,
                  taskCompletedTime,
                  quantity,
                  note
                }, key) =>

                  <Task
                    key={key}
                    id={id}
                    text={text}
                    isChecked={isChecked}
                    updateTasks={updateTasks}
                    dateCreated={dateCreated}
                    dateToBeCompleted={dateToBeCompleted}
                    taskCompletedTime={taskCompletedTime}
                    quantity={quantity}
                    note={note}
                  />

                )(node)
              }

              <TaskGroupFooter>

                <AddTask
                  disabled={reduce((a, item) => a + !item.text, 0)(values(node))}
                  onClick={() => createTask(rootKey)}>
                  +
                </AddTask>

                <ItemsRemaining>
                  {tasksRemainingCount(node)} items left
                </ItemsRemaining>

              </TaskGroupFooter>

            </TaskGroup>

          )(tasks)
        }

      </AppBody>

    </Container>

  );

};

export default App;
