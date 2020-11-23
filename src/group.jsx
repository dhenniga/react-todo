import { keys } from "ramda";
import React from "react";
import styled from "styled-components";

///////////////////////////////////

const Container = styled.div`
  text-align: left;
  width: fit-content;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  position: relative;
`;

const Chevron = styled.div`
  padding: 0;
  margin: 0;
  font-size: 30pt;
  width: 40px;
  height: 40px;
  transform: rotate(90deg) !important;
  text-align: center;
`;

const Label = styled.label`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 40px;
  user-select: none;
`;

const DeleteButton = styled.div`
  background-color: red;
  position: absolute;
  right: 0px;
  top: 0px;
  font-family: sans-serif;
  font-size: 15pt;
  font-weight: 900;
  padding: 0px;
  margin: 0px;
  line-height: 25px;
  border-radius: 5px;
  width: 25px;
  height: 25px;
  display: grid;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Header = styled.div`
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
`;

///////////////////////////////////

const Group = ({ children, title }) => {

  return (

    <Container>

      <Header>

        <Chevron>&#8250;</Chevron>

        <Label>{title}</Label>

        {/* <DeleteButton>-</DeleteButton> */}

      </Header>

      {children}

    </Container>

  );

};

export default Group;
