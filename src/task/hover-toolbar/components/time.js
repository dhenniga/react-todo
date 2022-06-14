import styled, { css } from 'styled-components'
import { TimeContainer } from '../../task.styled'
import dayjs from "dayjs"
import RelativeTime from 'dayjs/plugin/relativeTime'
import WatchIcon from "../../../buttons/watch-icon"

const TimeText = styled.div`
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

dayjs.extend(RelativeTime)

const Time = ({ isOverDue, timeDisplayType, dateToBeCompleted }) =>

  <TimeContainer>

    <TimeText
      isOverDue={isOverDue}>
      {timeDisplayType === 'on' && dayjs(dateToBeCompleted).format('MMMM D, YYYY')}
      {timeDisplayType === 'in' && dayjs().to(dayjs(dateToBeCompleted))}
      {timeDisplayType === 'at' && dayjs(dateToBeCompleted).format('HH:mm')}
    </TimeText>

    <WatchIcon
      timeDisplayType={timeDisplayType}
      isOverDue={isOverDue}
    />

  </TimeContainer>

export default Time