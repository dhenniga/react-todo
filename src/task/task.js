import React, { useState } from "react";
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
  onToggleChange,
  onDeleteTask,
  onRenameTask
}) => {

  const [isActive, setIsActive] = useState(isChecked);

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
        id={id}
        type="text"
        isChecked={isActive}
        onChange={event => onRenameTask(id, event.target.value)}
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
