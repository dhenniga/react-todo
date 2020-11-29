import React, { useState } from "react";
import {
  Container,
  Checkbox,
  Input,
  DeleteButton
} from "./task.styled";
import useTask from "../useTask";

const Expression = ({
  id,
  text,
  isChecked,
  onToggleChange,
  onDeleteTask
}) => {

  const [isActive, setIsActive] = useState(isChecked);

  const {
    renameTask
  } = useTask();

  return (

    <Container>

      <Checkbox
        type="checkbox"
        checked={isActive}
        onChange={() => {
          setIsActive(!isActive);
          onToggleChange(id, isActive)
        }}
      />

      <Input
        type="text"
        isChecked={isActive}
        onChange={event => renameTask(id, event.target.value)}
        defaultValue={text}
        placeholder="Enter task name"
      />

      <DeleteButton
        onClick={() => onDeleteTask(id)}>
        x
        </DeleteButton>

    </Container>

  );

};

export default Expression;
