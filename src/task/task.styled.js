import styled, { css } from "styled-components";

export const DeleteButton = styled.button`
  background-color: red;
  height: 16px;
  width: 16px;
  border-radius: 3px;
  position: relative;
  top: 8px;
  border: none;
  outline: 0px;
  color: white;
  cursor: pointer;
  font-family: sans-serif;
  line-height: 0px;
  font-weight: 400;
  font-size: 9pt;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0,0,0,1);
`;

export const Container = styled.div`
  height: 40px;
  width: 100%;
  display: grid;
  /* align-content: center; */
  position: relative;
  grid-template-columns: 26px 1fr max-content;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /* margin-bottom: 1px; */
  transition: border-bottom-color 0.3s cubic-bezier(0,0,0,1);

  &:hover {
    border-bottom-color: #656d78;
    border-bottom-width: 1px;
    margin-bottom: 0px;
    ${DeleteButton} {
      opacity: 1 !important;
    }
  }
`;

export const Input = styled.input`
  text-align: left;
  color: black;
  font-family: ${props => props.theme.rwRegular};
  font-weight: 600;
  background-color: transparent;
  border: 0px;
  outline: 0px;
  width: calc(100% - 35px);
  text-overflow: ellipsis;
  white-space: nowrap;

  ${(props) =>
    props.checked &&
    css`
      text-decoration: line-through;
      font-style: italic;
      opacity: 0.3;
      user-select: none;
      pointer-events: none;
    `}
`;

export const Checkbox = styled.input`
  position: relative;
  top: 11px;
  left: 0;
`;