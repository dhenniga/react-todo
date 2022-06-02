import styled, { css } from "styled-components";

export const Container = styled.div`
  text-align: left;
  position: relative;
  transition: 0.3s cubic-bezier(0.5, 0.2, 0, 1);
  transition-property: padding-bottom height;
  overflow: hidden overlay;
  display: grid;
  align-items: center;
  padding: 0px 15px;
  padding-bottom: ${props => props.isExpanded ? 0 : 0}px;

  ::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(${props => props.theme.accentColor}, 0.3);
}

${props => props.isExpanded && css`
border-radius: 10px;
background-color: rgba(128,128,128,0.2);
margin-bottom: 15px;
  `}

  ${props => !props.isExpanded && css`
    height: 58px !important;
    overflow: hidden !important;
  `}
`;

export const Chevron = styled.div`
  padding: 0;
  margin: 0;
  width: 20px;
  height: 20px;
  display: grid;
  justify-content: start;
  align-items: center;
`;

export const ChevronSVG = styled.svg`
  transition: transform 0.3s cubic-bezier(0.5, 0.2, 0, 1);
  transform-origin: 50% 50%;
  ${props => props.isExpanded && css`
    transform: rotate(-180deg);
  `}

`;

export const ChevronPath = styled.path`
  fill: rgba(${props => props.theme.accentColor});
`;

export const Input = styled.input`
  font-family: ${props => props.theme.rc_regular};
  letter-spacing: 0.2px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: calc(100% - 20px);
  margin-right: 15px;
  user-select: none;
  background-color: transparent;
  border: none;
  outline: 0px;
  font-size: 10pt;
  font-weight: 300;
  color: rgba(${props => props.theme.groupHeaderTextColor});
`;

export const Header = styled.div`
  border-bottom: 2px solid rgba(0,0,0,0);
  display: grid;
  transition: border-bottom 0.3s cubic-bezier(0.5, 0.2, 0, 1);
  grid-template-columns: 20px 1fr;
  align-items: center;
  min-height: 58px;

  ${props => props.isExpanded && css`
  border-bottom: 2px solid rgba(${props => props.theme.groupHeaderBorderBottomColor});
  grid-template-columns: 20px 1fr 23px 22px !important;
  margin-top:20px;
  min-height: 38px;
  `}

`;

export const ToggleSelectAll = styled.input`
  margin: 0px;
  padding: 0px;
  margin-left: 0px;
`;

export const DeleteGroupButton = styled.button`
  width: 18px;
  padding: 0;
  margin: 0;
  background-color: red;
  color: white;
  border: 0;
  outline: 0;
  border-radius: 50px;
  font-size: 7pt;
  font-weight: 900;
  height: 18px;
  cursor: pointer;
  transition: opacity 0.3s cubic-bezier(0.5, 0.2, 0, 1);
`

export const TaskGroupFooter = styled.div`
  height: 37px;
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  /* border-bottom: 3px solid black; */
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

export const ItemsRemaining = styled.label`
  font-family: ${props => props.theme.Regular};
  font-size: 8pt;
  text-align: right; 
  user-select: none;
  color: rgba(${props => props.theme.taskGroup.tasksRemainingTextColor});
`;