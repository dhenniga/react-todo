import styled from "styled-components";

export const TimeContainerBackground = styled.div`
  background-color: rgba(0,0,0,0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;
  overflow:scroll;
`;

export const TimeContainer = styled.div`
  margin: 15px;
  display: block;
  width: fit-content;
  height: fit-content;
  background-color: orange;
  color: white;
  padding: 20px;
  user-select: none;
  cursor: pointer;
`;