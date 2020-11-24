import React from "react";
import {
  Container,
  Chevron,
  Input,
  Header
} from "./task-group.styled";

const Group = ({ children, title }) => {

  return (

    <Container>

      <Header>

        <Chevron>&#8250;</Chevron>

        <Input
          defaultValue={title}
          placeholder="Enter Group Name..."
        />

      </Header>

      {children}

    </Container>

  );

};

export default Group;
