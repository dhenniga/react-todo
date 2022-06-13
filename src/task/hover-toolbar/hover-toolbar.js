import React from 'react';
//  Styled Components
import {
  TimeText,
  StatusContainer,
  ProgressRotatingSVG,
  ProgressRotatingPath
} from "./hover-toolbar.styled";
import {
  TimeContainer,
  QuantityContainer,
  DisplayContainer
} from "../task.styled";
import RelativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";
import WatchIcon from "../../buttons/watch-icon";

dayjs.extend(RelativeTime);

const HoverToolbar = ({
  quantity,
  dateToBeCompleted,
  status,
  isOverDue,
  timeDisplayType,
  checkState
}) => {

  return (

    <DisplayContainer
      quantity={quantity}
      dateToBeCompleted={dateToBeCompleted}
      status={status}>

      {
        status &&
        <StatusContainer>
          <ProgressRotatingSVG width="11.3" height="11.3" viewBox="0 0 2.99 2.99" xmlns="http://www.w3.org/2000/svg">
            <ProgressRotatingPath d="M1.5 2.99a1.49 1.49 0 0 1-1.06-.44.32.32 0 0 1 .44-.44.84.84 0 0 0 .61.25.85.85 0 0 0 .8-.53.86.86 0 0 0-.8-1.2.31.31 0 0 1 0-.63 1.49 1.49 0 0 1 1.06 2.55 1.46 1.46 0 0 1-1.06.44z" class="ldl-scale" />
          </ProgressRotatingSVG>
        </StatusContainer>
      }

      {
        dateToBeCompleted &&
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
      }

      {
        quantity &&
        <QuantityContainer
          checked={checkState}
          isOverDue={isOverDue}>
          {quantity}
        </QuantityContainer>
      }

    </DisplayContainer>
  )

}

export default HoverToolbar