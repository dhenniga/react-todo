import React from 'react'
import styled, { css } from 'styled-components'

const StatusContainer = styled.div`
  margin: 0px 8px;
`

const ProgressRotatingSVG = styled.svg`
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
animation: rotate 1.5s linear infinite;
`

const ProgressRotatingPath = styled.path`
  fill: rgb(${props => props.theme.accentColor});

  ${props => props.isOverDue && css`
  fill: white !important;
  `}

`


const Status = ({ isOverDue }) =>

  <StatusContainer>
    <ProgressRotatingSVG
      width="11.3"
      height="11.3"
      viewBox="0 0 2.99 2.99"
      xmlns="http://www.w3.org/2000/svg">

      <ProgressRotatingPath
        isOverDue={isOverDue}
        d="M1.5 2.99a1.49 1.49 0 0 1-1.06-.44.32.32 0 0 1 .44-.44.84.84 0 0 0 .61.25.85.85 0 0 0 .8-.53.86.86 0 0 0-.8-1.2.31.31 0 0 1 0-.63 1.49 1.49 0 0 1 1.06 2.55 1.46 1.46 0 0 1-1.06.44z"
      />

    </ProgressRotatingSVG>
  </StatusContainer>

export default Status