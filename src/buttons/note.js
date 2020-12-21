import React from "react";
import styled, { useTheme } from "styled-components";

const Button = styled.button`
  border: none;
  width: 16px;
  height: 16px;
  margin: 0px;
  margin: 0px 5px;
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

const DeleteButton = ({ isOverDue, handleClick }) => {

  const marp = useTheme().buttonIconColor;

  return (
    <Button
      onClick={handleClick}>

      <svg
        height="16"
        width="16">
        <path
          d="M4 13V3h8v5.771C12 10.825 9 10 9 10s.759 3-1.319 3zm9-3.807V2H3v12h5.094C9.676 14 13 10.389 13 9.193zM10.5 8.5h-5V8h5zm0-2h-5V7h5zm0-1.5h-5v.5h5z"
          fill={isOverDue ? "white" : marp}
        />
      </svg>

    </Button>
  )
}

export default DeleteButton