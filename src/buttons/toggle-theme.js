import React from "react";
import styled from "styled-components";

const Button = styled.div`
  background-color: transparent;
  outline: none;
  border: 0px;
  color: white;
  float: right;
  padding: 0px;
  margin: 0px 20px;
  display: grid;
  height: 26px;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.5, 0.2, 0, 1);
  transform: ${props => props.isDarkTheme ? "rotate(0deg)" : "rotate(180deg)"};
  transition: 0.3s cubic-bezier(0,0,0,1);
  transition-property: opacity, transform;

&:hover {
  transform: scale(1.1) ${props => props.isDarkTheme ? "rotate(0deg)" : "rotate(180deg)"};
}
`;

const ToggleThemeButton = ({ isDarkTheme, handleClick }) =>

  <Button
    isDarkTheme={isDarkTheme}
    onPointerUp={handleClick}>

    <svg
      width="20"
      height="20">
      <path
        d="M10 1.667c4.595 0 8.333 3.738 8.333 8.333S14.595 18.333 10 18.333 1.667 14.595 1.667 10 5.405 1.667 10 1.667zM10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm0 3.333a6.667 6.667 0 000 13.334z"
        fill="white"
      />
    </svg>

  </Button>

export default ToggleThemeButton