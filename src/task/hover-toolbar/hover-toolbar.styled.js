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

export const StatusText = styled.div`
  padding: 3px 8px;
  border-radius: 5px;
  margin: 0px 10px;
  font-family: rc_regular;
  font-size: 9px;
  background-color: rgba(${props => props.theme.accentColor}, 0.4);
  color: white;
`