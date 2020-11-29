import React, { useEffect, useState } from "react";
import "./App.css";
import { values, reduce } from "ramda";
import Task from "./task/task";
import TaskGroup from "./task-group/task-group";
import { mapObjectToValues } from "./app.service";
import { AddTask, ItemsRemaining } from "./app.styled";
import useTask from "./useTask";

///////////////////////

const App = () => {

  const [tasks, updateTasks] = useState();

  const {
    getTasks,
    createTask,
    createTaskGroup,
    tasksRemainingCount,
    toggleTask,
    deleteTask,
    renameTask,
    selectAll,
    selectNone
  } = useTask(updateTasks);

  useEffect(() => {
    getTasks().then(updateTasks);
  }, []);

  const handleSelectAll = node =>
    selectAll(node)
      .then(getTasks().then(updateTasks));

  const handleSelectNone = node =>
    selectNone(node)
      .then(getTasks().then(updateTasks));

  return (

    <div className="App">

      {
        mapObjectToValues((node, rootKey) =>

          <TaskGroup
            key={rootKey}
            title={rootKey}
            node={node}
            onSelectAll={handleSelectAll}
            onSelectNone={handleSelectNone}>

            {
              mapObjectToValues(({ id, text, isChecked }, key) =>

                <Task
                  key={key}
                  id={id}
                  text={text}
                  isChecked={isChecked}
                  onToggleChange={(id, value) => toggleTask(id, value)}
                  onDeleteTask={id => deleteTask(id)}
                  onRenameTask={(id, value) => renameTask(id, value)}
                  onSelectAll={handleSelectAll}
                />

              )(node)
            }

            <AddTask
              disabled={reduce((a, item) => a + !item.text, 0)(values(node))}
              onClick={() => createTask(rootKey)}>
              +
              </AddTask>

            <ItemsRemaining>
              {tasksRemainingCount(values(node))} items left
              </ItemsRemaining>

          </TaskGroup>

        )(tasks)
      }

      <button onClick={() => createTaskGroup()}>Add Task Group</button>

    </div>

  );
};

export default App;
