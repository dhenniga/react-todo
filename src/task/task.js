import React, { useState } from "react";
import useTask from "../useTask";
import {
  Container,
  Checkbox,
  Input,
  DeleteButton
} from "./task.styled";


const Expression = ({
  id,
  text,
  isChecked,
  updateTasks
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
        placeholder="Enter task name"
      />

      <DeleteButton
        onClick={() => deleteTask(id)}>
        x
      </DeleteButton>

    </Container>

  );

};

export default Expression;
