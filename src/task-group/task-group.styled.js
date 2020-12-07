import styled from "styled-components";

export const Container = styled.div`
  text-align: left;
  width: 300px;
  padding: 10px;
  margin: 10px;
  position: relative;
  display: inline-block;
`;

export const Chevron = styled.div`
  padding: 0;
  margin: 0;
  font-size: 30pt;
  width: 40px;
  height: 40px;
  transform: rotate(90deg) !important;
  text-align: center;
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
`;

export const Header = styled.div`
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: 40px 1fr 13px;
  align-items: center;
`;

export const ToggleSelectAll = styled.input`
  margin: 0px;
  padding: 0px;
`;