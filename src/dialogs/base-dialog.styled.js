import styled from 'styled-components'

export const Container = styled.div`
  width: 200px;
  height: auto;
  background-color: black;
  border-radius: 3px;
  display: grid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-items: center;
  align-items: center;
  padding: 15px 15px;
  padding-top: 0px;
  z-index: 2000;
`

export const Text = styled.p`
  font-size: 12px;
  color: white;
  /* padding: 15px; */
`

export const Button = styled.button`
  background-color: rgba(${props => props.accentColor}, 0.4);
  font-size: 12px;
  border: none;
  outline: none;
  border-radius: 3px;
  padding: 5px 8px;
  color: white;

  &:hover {
    background-color: rgba(${props => props.accentColor}, 0.7) !important;
  }

  &:active {
    background-color: rgb(${props => props.accentColor}) !important;
  }
  `