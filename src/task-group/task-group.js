import React, { useState } from "react";
import {
  Container,
  Chevron,
  ChevronPath,
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

        <Chevron
          onClick={() => console.log("Close Group?")}>
          <svg
            width="16"
            height="8">
            <ChevronPath d="M16 0h-4.283L8 3.717 4.283 0H0l8 8z" />
          </svg>
        </Chevron>

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
              ? onSelectNone(title)
              : onSelectAll(title)
          }} />

      </Header>

      {children}

    </Container>

  );

};

export default Group;
