import styled from "styled-components";

export const AddTask = styled.div`
  width: 20px;
  height: 40px;
  color: black;
  display: grid;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 20pt;
  cursor: pointer;
`;

export const ItemTotal = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 10pt;
  color: #aab2bd;
`;

export const DeleteButton = styled.button`
  background-color: red;
  height: 16px;
  width: 16px;
  display: grid;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 13px;
  right: 0px;
  border: none;
  outline: 0px;
  color: white;
  cursor: pointer;
  font-family: sans-serif;
  font-weight: 900;
  font-size: 9pt;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }
`;