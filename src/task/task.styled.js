import styled, { css } from "styled-components";
import Moment from "react-moment";

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
  grid-template-columns: 1fr max-content max-content;;
  align-items: center;
  overflow: hidden;
  width: 0px;
  margin-left: 20px;
`;

export const Container = styled.div`
  height: 39px;
  width: 100%;
  padding: 0px;
  margin: 5px 0px;
  display: grid;
  align-content: center;
  position: relative;
  grid-template-columns: 26px 1fr max-content;
  border-bottom: 1px solid rgba(${props => props.theme.containerBorderBottom});
  transition: 0.3s cubic-bezier(0,0,0,1);
  transition-property: border-bottom-color, background-color, padding;

  &:hover {
    border-bottom-color: #656d78;
    ${SettingsContainer} {
      display: grid;
      width: fit-content !important;
      grid-template-columns: 1fr max-content max-content !important;
    }

    ${TimeContainer} {
      display: none;
    }
  }

  ${props => props.isOverDue && css`
  background-color: rgba(255,0,0,0.9) !important;
  padding: 0px 15px;
  width: calc(100% - 30px) !important;
  border-radius: 5px;
  `}
`;

export const Input = styled.input`
  text-align: left;
  color: rgba(${props => props.theme.inputColor});
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

  ${props => props.isOverDue && css`
    color: white !important;
    ::placeholder {
      color: rgba(255,255,255,0.7);
    }
  `}
`;

export const Checkbox = styled.input`
  padding: 0;
  margin: auto 0px;
`;

export const TimePassingBar = styled.div`
  height: 3px;
  max-width: 100%;
  transition: 1s cubic-bezier(0,0,0,1);
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