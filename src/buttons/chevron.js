import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  padding: 0;
  margin: 0;
  width: 20px;
  height: 20px;
  display: grid;
  justify-content: start;
  align-items: center;
`;

const SVG = styled.svg`
  transition: transform 0.3s cubic-bezier(0.5, 0.2, 0, 1);
  transform-origin: 50% 50%;
  ${props => props.isExpanded && css`
    transform: rotate(-180deg);
  `}
`;

const Path = styled.path`
  fill: rgba(${props => props.theme.accentColor});
`;


const Chevron = ({ handleClick, expandLocalState }) =>

  <Container
    onClick={handleClick}>
    <SVG
      isExpanded={expandLocalState}
      width="9"
      height="9"
      viewBox="0 0 2.381 2.381">
      <Path
        d="M1.19.476a.239.238 0 0 0-.168.07l-.953.953a.239.238 0 0 0 .168.406h1.906a.239.238 0 0 0 .17-.407L1.358.546a.239.238 0 0 0-.169-.07z"
      />
    </SVG>
  </Container>

export default Chevron

