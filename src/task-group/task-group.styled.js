import styled from "styled-components";

export const Container = styled.div`
  text-align: left;
  /* width: calc(100% - 40px); */
  /* width: 350px; */
  padding: 10px 15px;
  margin: 10px;
  /* max-width: 350px; */
  position: relative;
  display: inline-block;
  background-color: rgba(${props => props.theme.taskGroup.groupBGColor});
  border-radius: 5px;
  box-shadow: ${props => props.theme.taskGroup.groupBoxBorderColor};
`;

export const Chevron = styled.div`
  padding: 0;
  margin: 0;
  width: 25px;
  height: 40px;
  display: grid;
  justify-content: start;
  align-items: center;
`;

export const ChevronPath = styled.path`
  fill: rgba(${props => props.theme.taskGroup.chevronPathColor});
`;

export const Input = styled.input`
  font-family: ${props => props.theme.Light};
  letter-spacing: 0.2px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 15px;
  user-select: none;
  background-color: transparent;
  border: none;
  outline: 0px;
  font-size: 12pt;
  font-weight: 600;
  color: rgba(${props => props.theme.groupHeaderTextColor});
`;

export const Header = styled.div`
  border-bottom: 2px solid rgba(${props => props.theme.groupHeaderBorderBottomColor});
  display: grid;
  grid-template-columns: 25px 1fr 13px;
  align-items: center;
`;

export const ToggleSelectAll = styled.input`
  margin: 0px;
  padding: 0px;
`;