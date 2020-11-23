import React, { useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  height: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: 40px 1fr;
  align-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Text = styled.label`
  text-align: left;
  color: black;
  font-family: sans-serif;

  ${(props) =>
    !props.isActive &&
    css`
      text-decoration: line-through;
      font-style: italic;
      opacity: 0.3;
    `}
`;

const Expression = ({ text, isChecked }) => {

  const [isActive, setIsActive] = useState(isChecked);

  return (

    <Container>

      <input
        type="checkbox"
        checked={!isActive}
        onChange={() => setIsActive(!isActive)}
      />

      <Text
        isActive={isActive}>
        {text}
      </Text>

    </Container>

  );

};

export default Expression;
