import styled from "styled-components";

export const AddTask = styled.button`
  width: 20px;
  height: 40px;
  color: black;
  display: grid;
  outline: 0px;
  border: 0px;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 20pt;
  cursor: pointer;
  background-color: transparent;
  transition: transform 0.5s cubic-bezier(0,0,0,1);

  &:hover {
    transform: scale(1.2);
  }

  &:disabled {
    opacity: 0.2;
  }
`;

export const ItemTotal = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 10pt;
  color: #aab2bd;
`;

export const ItemsRemaining = styled.label`
  font-family: sans-serif;
  font-size: 8pt;
  float: right;
  height: 40px;
  line-height: 40px;
  position: relative;
  top: -20px;              
`;