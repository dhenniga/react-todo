import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  width: 16px;
  height: 16px;
  margin: 0px;
  margin-left: 5px;
  outline: 0px;
  padding: 0px;
  cursor: pointer;
  opacity: 1;
  background-color: transparent;
  transition: 0.3s cubic-bezier(0,0,0,1);
  transition-property: opacity, transform;

  &:hover {
    transform: scale(1.1);
  }
`;

const DeleteButton = ({ handleClick }) =>
  <Button
    onClick={handleClick}>
    <svg
      width="16"
      height="16">
      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm2.421 10.467L8.005 9.074 5.603 11.5l-1.07-1.069 2.395-2.425L4.5 5.603l1.07-1.069 2.423 2.393L10.388 4.5l1.079 1.079-2.392 2.415 2.425 2.394z" fill="red" />
    </svg>
  </Button>

export default DeleteButton