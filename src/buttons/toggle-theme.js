import React from "react";
import styled from "styled-components";

const Button = styled.div`
  background-color: transparent;
  height: 46px;
  width: 46px;
  outline: none;
  border: 0px;
  color: white;
  float: right;
  padding: 0px;
  display: grid;
  align-items: center;
  justify-items: center;
  transition: all 0.5s cubic-bezier(0.5, 0.2, 0, 1);
  transform: ${props => props.isDarkTheme ? "rotate(0deg)" : "rotate(180deg)"};
  transition: 0.3s cubic-bezier(0,0,0,1);
  transition-property: opacity, transform;
  border-left: solid 1px rgb(${props => props.theme.headerBorderColor});

&:hover {
  transform: scale(1.1) ${props => props.isDarkTheme ? "rotate(0deg)" : "rotate(180deg)"};
}
`;

const ToggleThemeButton = ({ isDarkTheme, handleClick }) =>

  <Button
    isDarkTheme={isDarkTheme}
    onPointerUp={handleClick}>

    <svg
      width="16"
      height="16">
      <path
        d="M8 1.334c3.676 0 6.666 2.99 6.666 6.666S11.676 14.666 8 14.666 1.334 11.676 1.334 8 4.324 1.334 8 1.334zM8 0a8 8 0 1 0 .002 16.002A8 8 0 0 0 8 0zm0 2.666a5.334 5.334 0 0 0 0 10.667z"
        fill="#fff"
      />
    </svg>

  </Button>

export default ToggleThemeButton