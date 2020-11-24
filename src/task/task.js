import React, { useState } from "react";
import axios from "axios";
import { Container, Checkbox, Input } from "./task.styled";

const Expression = ({
  id,
  text,
  isChecked
}) => {

  const [isActive, setIsActive] = useState(isChecked);

  return (

    <Container>

      <Checkbox
        type="checkbox"
        checked={isActive}
        onChange={event => {
          setIsActive(!isActive);
          axios.patch(`/tasks/${id}`, { isChecked: !isActive });
        }}
      />

      <Input
        type="text"
        isChecked={isActive}
        onChange={event =>
          axios.patch(`/tasks/${id}`, { text: event.target.value })
        }
        defaultValue={text}
        placeholder="Enter task name"

      />

    </Container>

  );

};

export default Expression;
