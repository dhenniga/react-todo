import styled, { css } from "styled-components";

export const Container = styled.div`
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

export const Input = styled.input`
  text-align: left;
  color: black;
  font-family: sans-serif;
  border: 0px;
  outline: 0px;

  ${(props) =>
    props.isChecked &&
    css`
      text-decoration: line-through;
      font-style: italic;
      opacity: 0.3;
      user-select: none;
      pointer-events: none;
    `}
`;

export const Checkbox = styled.input``;
