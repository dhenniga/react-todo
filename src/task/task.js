import React, { useState } from "react";
import useTask from "../useTask";
import Time from "../time/time";

import {
  Container,
  Checkbox,
  Input,
  DeleteButton,
  SettingsContainer
} from "./task.styled";

const Expression = ({
  id,
  text,
  isChecked,
  updateTasks,
  dateCreated,
  dateToBeCompleted
}) => {

  const {
    toggleTask,
    deleteTask,
    renameTask
  } = useTask(updateTasks);

  const [isActive, setIsActive] = useState(isChecked);

  return (

    <Container>

      <Checkbox
        type="checkbox"
        checked={isActive}
        onChange={() => {
          setIsActive(!isActive);
          toggleTask(id, isActive)
        }}
      />

      <Input
        type="text"
        checked={isActive}
        onBlur={event =>
          renameTask(
            id,
            event.target.value
          )}
        defaultValue={text}
        onChange={() => { }}
        placeholder="Enter task name..."
      />

      <SettingsContainer>

        <Time
          id={id}
          dateCreated={dateCreated}
          dateToBeCompleted={dateToBeCompleted}
          updateTasks={updateTasks}
        />

        <DeleteButton
          onClick={() => deleteTask(id)}>
          x
      </DeleteButton>

      </SettingsContainer>

    </Container >

  );

};

export default Expression;
