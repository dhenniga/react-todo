import styled, {css} from "styled-components";

export const Container = styled.div`
  text-align: left;
  padding: 10px 15px;
  margin: 10px 10px 0px 10px;
  position: relative;
  width: calc(100% - 50px);
  display: inline-block;
  background-color: rgba(${props => props.theme.taskGroup.groupBGColor});
  border-radius: 5px;
  height: calc(${props => props.thingHeight}px + 60px);
  transition: 0.3s cubic-bezier(0.5, 0.2, 0, 1);
  transition-property: padding-bottom height;
  overflow: hidden;
  padding-bottom: ${props => props.isOpen ? 5 : 20}px;
  box-shadow: ${props => props.theme.taskGroup.groupBoxBorderColor};

  ${props => !props.isOpen && css`
    height: 30px !important;
  `}
`;

export const Chevron = styled.div`
  padding: 0;
  margin: 0;
  width: 25px;
  height: 40px;
  display: grid;
  justify-content: start;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.5, 0.2, 0, 1);
  transform-origin: 8px 20px;

  ${props => props.isOpen && css`
    transform: rotate(-180deg);
  `}

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
  border-bottom: 2px solid rgba(0,0,0,0);
  display: grid;
  transition: border-bottom 0.3s cubic-bezier(0.5, 0.2, 0, 1);
  grid-template-columns: 25px 1fr 23px 22px;
  align-items: center;

  ${props => props.isOpen && css`
  border-bottom: 2px solid rgba(${props => props.theme.groupHeaderBorderBottomColor});
  `}

`;

export const ToggleSelectAll = styled.input`
  margin: 0px;
  padding: 0px;
  margin-left: 0px;
`;