import React from "react";
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

  const { allSelected } = useTask();

  const isChecked = allSelected(node);

  return (

    <Container>

      <Header>

        <Chevron>&#8250;</Chevron>

        <Input
          defaultValue={title}
          placeholder="Enter Group Name..."
        />

        <ToggleSelectAll
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            isChecked
              ? onSelectNone(node)
              : onSelectAll(node)
          }} />

      </Header>

      {children}

    </Container>

  );

};

export default Group;
