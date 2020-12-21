import React from "react";
import styled, { useTheme } from "styled-components";

const Button = styled.button`
  border: 0px;
  background-color: transparent;
  margin: 0px 5px;
  padding: 0;
  height: 16px;
  width: 16px;
  transition: 0.3s cubic-bezier(0,0,0,1);
  transition-property: transform;
  cursor: pointer;
  outline: 0px;

  &:hover {
    transform: scale(1.1);
  }
`;

const TimeButton = ({ handleClick, isOverDue }) => {

  const marp = useTheme().buttonIconColor;

  return (

    <Button
      onClick={handleClick}>

      <svg
        width="16"
        height="16">
        <path
          d="M12.086 1.583c-.552 0-1.105.156-1.586.469a7.035 7.035 0 014.033 4.03 2.913 2.913 0 00-2.447-4.499M8 13.25a4.673 4.673 0 01-4.667-4.667A4.673 4.673 0 018 3.916a4.673 4.673 0 014.668 4.667A4.673 4.673 0 018 13.25m5.835-4.667a5.834 5.834 0 10-11.67 0c0 2.518 1.802 5.834 5.835 5.834 4.043 0 5.835-3.321 5.835-5.834m-12.367-2.5a2.913 2.913 0 014.031-4.031 7.022 7.022 0 00-4.031 4.031m7.114 2.5V5.666H7.416V9.75h3.5V8.583z"
          fill={isOverDue ? "white" : marp}
        />
      </svg>

    </Button>

  )

};

export default TimeButton;