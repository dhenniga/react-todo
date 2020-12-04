import styled from "styled-components";

export const Container = styled.div`
  text-align: left;
  width: 400px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  position: relative;
  background-color: white;
  box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.1);
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
  letter-spacing: -0.5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 40px;
  user-select: none;
  border: none;
  outline: 0px;
  font-size: 12pt;
  font-weight: 600;
`;

export const Header = styled.div`
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
`;

export const ToggleSelectAll = styled.input`
  position: absolute;
  right: 18px;
  top: 30px;
`;