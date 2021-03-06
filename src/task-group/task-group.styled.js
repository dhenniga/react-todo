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
  background-color: white;
  border-radius: 5px;
  box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.1);
`;

export const Chevron = styled.div`
  padding: 0;
  margin: 0;
  width: 25px;
  height: 40px;
  display: grid;
  justify-content: start;
  align-items: center;
  opacity: 0.1;
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
  grid-template-columns: 25px 1fr 13px;
  align-items: center;
`;

export const ToggleSelectAll = styled.input`
  margin: 0px;
  padding: 0px;
`;