import styled from "styled-components";

export const AppTitle = styled.label`
  font-size: 10pt;
  text-transform: uppercase;
  font-family: rw_bold;
  font-weight: 600;
  letter-spacing: 2px;
  line-height: 26px;
`;

export const Container = styled.div`
  background-color: rgba(${props => props.theme.background});
  display: grid;
  grid-template-rows: max-content 1fr;
  height: 100vh;
  overflow: hidden;
  max-width: 600px;
  margin: 0px auto;

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
  overflow-y: overlay;
  display: block;
  /* flex-direction: row;
  flex-basis: 100%;
  flex: 1; */
  /* box-sizing:border-box; */
  min-width: 350px;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: rgba(${props => props.theme.mainBackground});

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
  color: rgba(${props => props.theme.taskGroup.addTaskColor});
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
  color: rgba(${props => props.theme.taskGroup.tasksRemainingTextColor});
`;

export const AddGroupButton = styled.button`
  background-color: #434a54;
  float: right;
  font-size: 20pt;
  font-weight: 600;
  line-height: 16px;
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