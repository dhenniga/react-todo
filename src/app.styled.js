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

  &:hover {
    transform: scale(1.2);
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