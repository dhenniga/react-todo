import React, { useEffect, useState } from "react";
import {
  Container,
  Chevron,
  Input,
  Header
} from "./task-group.styled";
import useTask from "../useTask";

const Group = ({ children, title, node }) => {

  const {
    selectAll,
    selectNone,
    allSelected
  } = useTask();

  const [toggleAll, setToggleAll] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(allSelected(node))


  return (

    <Container>

      <Header>

        <Chevron>&#8250;</Chevron>

        <Input
          defaultValue={title}
          placeholder="Enter Group Name..."
        />

        <input
          type="checkbox"
          checked={isAllSelected}
          style={{
            position: "absolute",
            right: 18,
            top: 30
          }}
          onChange={() => {
            setToggleAll(!toggleAll);
            toggleAll && setIsAllSelected(node)
              ? selectNone(node)
              : selectAll(node)
          }} />

      </Header>

      {children}

    </Container>

  );

};

export default Group;
