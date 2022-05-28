import styled from "styled-components";

export const AppTitle = styled.label`
  font-size: 10pt;
  text-transform: uppercase;
  font-family: rw_bold;
  font-weight: 600;
  letter-spacing: 2px;
  line-height: 26px;
`;

export const Container = styled.div`
   background-color: rgba(${props => props.theme.background});
  /* display: grid;
  grid-template-rows: max-content 1fr; */
  /* height: 100vh; */
  /* overflow: hidden; */
  /* max-width: 600px; */
  /* margin: 0px auto; */
`;

export const Header = styled.div`
  width: calc(100% - 20px);
  height: fit-content;
  padding: 10px;
  background-color: black;
  color: white;
  z-index: 2;
`;

export const AppBody = styled.div`
  border-radius: 10px;
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
  background-color: #434a54;
  float: right;
  font-size: 20pt;
  font-weight: 600;
  line-height: 16px;
  color: white;
  border: 0;
  /* margin: 15px; */
  padding:  5px 10px; 
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  transition: ${props => props.theme.fastEasing};

  &:hover {
    transform: scale3d(1.1, 1.1, 1.1);
  }
`;