import React, { useState } from "react";
import {
  Container,
  Chevron,
  Input,
  Header,
  ToggleSelectAll
} from "./task-group.styled";
import useTask from "../useTask";

const Group = ({
  children,
  title,
  node,
  onSelectAll,
  onSelectNone
}) => {

  const {
    allSelected,
    renameGroup
  } = useTask();

  const [
    checked,
    setChecked
  ] = useState(allSelected(node));

  return (

    <Container>

      <Header>

        <Chevron>&#8250;</Chevron>

        <Input
          defaultValue={title}
          placeholder="Enter Group Name..."
          onBlur={event =>
            renameGroup(
              node,
              event.target.value
            )}
        />

        <ToggleSelectAll
          type="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            checked
              ? onSelectNone(node)
              : onSelectAll(node)
          }} />

      </Header>

      {children}

    </Container>

  );

};

export default Group;
