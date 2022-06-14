import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  width: 35px;
  height: 35px;
  margin: 0px;
  outline: 0px;
  padding: 0px;
  cursor: pointer;
  opacity: 1;
  background-color: transparent;
  transition: 0.3s cubic-bezier(0,0,0,1);
  display: grid;
  justify-items: center;
  align-items: center;
  transition-property: background-color;
  border-radius: 3px;


  &:hover {
    background-color: rgba(128, 128, 128,0.1) !important;
  }
`;

const BaseButton = ({ handleClick, children }) =>
  <Button
    onClick={handleClick}>
    {children}
  </Button >

export default BaseButton