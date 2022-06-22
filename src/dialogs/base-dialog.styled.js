import styled, {css} from 'styled-components'

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

  export const Outer = styled.div`
    background-color: rgba(101, 109, 120, 0.5);
    width: 100vw;
    height: 100vh;
    opacity: 0;
    transition: opacity 5s cubic-bezier(0.5, 0.2, 0, 1);

    ${props => props.isVisible && css`
      opacity: 1 !important;
    `}
  `