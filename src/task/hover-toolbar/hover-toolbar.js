import React from 'react';
//  Styled Components
import {
  TimeText,
  StatusText
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
        <StatusText>
          {status}
        </StatusText>
      }

      {
        dateToBeCompleted &&
        <TimeContainer>

          <TimeText
            isOverDue={isOverDue}>
            {timeDisplayType === 'on' && dayjs(dateToBeCompleted).format('MMMM D, YYYY')}
            {timeDisplayType === 'in' && dayjs().to(dayjs(dateToBeCompleted))}
            {!timeDisplayType && 'broken'}
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