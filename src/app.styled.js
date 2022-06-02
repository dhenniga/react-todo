import styled from "styled-components";

export const AppTitle = styled.label`
  font-size: 10px;
  text-transform: uppercase;
  font-family: rw_regular;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 46px;
  padding-left: 15px;
  color: rgb(${props => props.theme.accentColor});
`;

export const Container = styled.div`
   background-color: rgba(${props => props.theme.background});
`;

export const Header = styled.div`
  width: 100%;
  height: fit-content;
  height: 46px;
  background-color: black;
  color: white;
  z-index: 2;
  border-bottom: inset 1px rgb(${props => props.theme.headerBorderColor});
`;

export const AppBody = styled.div`
  overflow-y: overlay;
  min-width: 350px;
  width: 100%;
  height: calc(100vh - 70px);
  background-color: rgba(${props => props.theme.mainBackground});
  transition: 0.3s cubic-bezier(0.5, 0.2, 0, 1);
  transition-property: background-color;

  ::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(${props => props.theme.accentColor}, 0.1);
}

  @media (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

////////////////////

export const ItemTotal = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 10pt;
  color: #aab2bd;
`;

////////////////////

export const AddGroupButton = styled.button`
font-family: rw_regular;
  background-color: transparent;
  height: 46px;
  width: 46px;
  float: right;
  font-size: 33pt;
  line-height: 46px;
  font-weight: 400;
  color: white;
  border: 0px;
  padding: 0px; 
  cursor: pointer;
  outline: none;
  transition: background-color ${props => props.theme.fastEasing};
  border-left: solid 1px rgb(${props => props.theme.headerBorderColor});

  &:hover {
    background-color: rgb(${props => props.theme.accentColor});
  }
`;