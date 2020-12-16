import styled from "styled-components";

export const Container = styled.div`
  background-color: rgba(${props => props.theme.background});
  display: grid;
  grid-template-rows: max-content 1fr;
  height: 100vh;
  overflow: hidden;

`;

export const Header = styled.div`
  width: calc(100% - 40px);
  height: fit-content;
  padding: 20px;
  background-color: black;
  color: white;
  z-index: 2;
`;

export const AppBody = styled.div`
  /* display: inline-grid; */
  /* align-items: center;
  justify-items: center;  */
  /* transition: all 1s cubic-bezier(0.5, 0.2, 0, 1); */
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: #f3f7fa;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TaskGroupFooter = styled.div`
  height: 37px;
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  border-bottom: 3px solid black;
`;

export const AddTask = styled.button`
  color: black;
  outline: 0px;
  padding: 0px;
  border: 0px;
  font-family: sans-serif;
  position: relative;
  top: -2px;
  font-weight: 600;
  font-size: 17pt;
  cursor: pointer;
  background-color: transparent;
  transition: transform 0.5s cubic-bezier(0,0,0,1);
  user-select: none;

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
  user-select: none;
`;

export const AddGroupButton = styled.button`
  background-color: #434a54;
  float: right;
  color: white;
  border: 0;
  /* margin: 15px; */
  padding:  5px 10px; 
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  transition: ${props => props.theme.fastEasing};

  &:hover {
    transform: scale3d(1.1, 1.1, 1.1);
  }
`;