import styled, { css } from "styled-components";

export const TimeText = styled.div`
  font-size: 10px;
  font-weight: 400;
  font-family: rc_regular;
  letter-spacing: 0px;
  color: #656d78;
  margin-right: 5px;
  transition: 0.3s cubic-bezier(0,0,0,1);
  transition-property: color;


  ${props => props.isOverDue && css`
    color: white !important;
  `}
`;

export const StatusContainer = styled.div`
  margin: 0px 8px;
`

export const ProgressRotatingSVG = styled.svg`
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
animation: rotate 1.5s linear infinite;
`

export const ProgressRotatingPath = styled.path`
  fill: rgb(${props => props.theme.accentColor});
`
