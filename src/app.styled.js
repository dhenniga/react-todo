import styled from "styled-components";

export const AddTask = styled.button`
  color: black;
  outline: 0px;
  padding: 0px;
  border: 0px;
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
  font-family: ${props => props.theme.Regular};
  font-size: 8pt;
  text-align: right; 
`;

export const AddGroupButton = styled.button`
  background-color: #434a54;
  color: white;
  border: 0;
  margin: 15px;
  padding: 15px;
  border-radius: 5px;
  float: left;
  cursor: pointer;
  outline: none;
  transition: ${props => props.theme.fastEasing};

  &:hover {
    transform: scale3d(1.1, 1.1, 1.1);
  }
`;