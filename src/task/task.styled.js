import styled, { css } from "styled-components";
import Moment from "react-moment";

export const AddSubTask = styled.div`
  font-family: sans-serif;
  font-size: 23px;
  font-weight: 400;
  color: ${props => props.isOverDue ? "white" : "black"};
  padding: 0px;
  margin: 0px;
  line-height: 16px;
  margin: 0px 4px;
  width: 16px;
  text-align: center;
  position: relative;
  top: -2px;
  user-select: none;
  cursor: pointer;
  transition: 0.3 cubic-bezier(0,0,0,1);
  transition-property: transform;

  &:hover {
    transform: scale(1.1);
  }
`;

export const StyledMoment = styled(Moment)`
  font-size: 7pt;
  font-weight: 400;
  font-family: sans-serif;
  letter-spacing: 0px;
  color: #656d78;
  margin-right: 5px;
  transition: 0.3s cubic-bezier(0,0,0,1);
  transition-property: color;


  ${props => props.isOverDue && css`
    color: white !important;
  `}
`;

export const TimeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 12px;
  align-items: center;
`;

export const SettingsContainer = styled.div`
  display: none;
  grid-template-columns: max-content max-content max-content max-content;
  align-items: center;
  overflow: hidden;
  width: 0px;
  margin-left: 20px;
`;

export const QuantityContainer = styled.div`
  width: 18px;
  height: 18px;
  line-height: 20px;
  background-color: rgb(${props => props.theme.task.taskQuantityTextBackground});
  color: rgb(${props => props.theme.task.taskQuantityText});
  border-radius: 90px;
  font-family: ${props => props.theme.bnRegular};
  font-size: 8.3pt;
  text-align: center;
  font-weight: 100;
  margin-left: 10px;
  opacity: ${props => props.checked ? 0.2 : 1};
  text-align:center;

  ${props => props.isOverDue && css`
    background-color: white !important;
    color: rgb(${props.theme.task.taskOverDueColor}) !important;
  `}
`;

export const DisplayContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.quantity ? "max-content" : ""} ${props => props.dateToBeCompleted ? "max-content" : ""};
`;

export const Container = styled.div`
  min-height: 39px;
  width: 100%;
  padding: 0px;
  margin: 5px 0px;
  display: grid;
  align-content: center;
  position: relative;
  grid-template-columns: 26px 1fr max-content;
  border-bottom: 1px solid rgba(${props => props.theme.task.taskBorderBottomcolor});
  transition: 0.3s cubic-bezier(0,0,0,1);
  transition-property: border-bottom-color, background-color, padding;

  &:hover {
    border-bottom-color: #656d78;
    ${SettingsContainer} {
      display: grid;
      width: fit-content !important;
      grid-template-columns: 1fr max-content max-content max-content !important;
    }

    ${TimeContainer} {
      display: none;
    }

    ${DisplayContainer} {
      display: none;
    }

    ${QuantityContainer} {
      display: ${props => props.checked ? "inline" : "none"};
    }
  }

  ${props => props.isOverDue && css`
  background-color: rgb(${props => props.theme.task.taskOverDueColor}) !important;
  padding: 0px 15px;
  width: calc(100% - 30px) !important;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px rgba(${props => props.theme.task.taskOverDueGlowColor});
  z-index: 100;
  `}
`;

export const Input = styled.input`
  text-align: left;
  color: rgba(${props => props.isOverDue ? "255,255,255,1" : props.theme.task.taskInputTextColor});
  font-family: ${props => props.theme.rwRegular};
  font-weight: 600;
  font-size: 9pt;
  background-color: transparent;
  border: 0px;
  outline: 0px;
  width: calc(100% - 10px);
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: 0.3s cubic-bezier(0,0,0,1);
  transition-property: color;


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
  padding: 0;
  margin: auto 0px;
`;

export const TimePassingBar = styled.div`
  height: 3px;
  max-width: 100%;
  transition: 1s cubic-bezier(1,1,1,1);
  transition-property: background-color, width;
  width: ${props => props.percentage}%;
  position: absolute;
  bottom: -1px;
  left: 0;
  pointer-events: none;
  z-index: 0;

  ${props => props.isOverDue && css`
    display: none !important;
  `};

  ${props => props.checked && css`
    display: none !important;
  `};
`;

export const NoteContainer = styled.div`
  width: calc(100% - 55px);
  padding: 15px;
  background-color: rgba(${props => props.theme.task.taskNoteBGColor});
  position:relative;
  right: -25px;
  margin-top: -5px;
  margin-bottom: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const NoteText = styled.div`
  font-family: rw_regular;
  font-size: 8.3pt;
  outline: none;
  color: rgba(${props => props.theme.task.taskNoteTextColor});
`;
