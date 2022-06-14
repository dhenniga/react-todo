import React from 'react'
import { DisplayContainer } from "../task.styled"
import Status from './components/status'
import Quantity from './components/quantity'
import Time from './components/time'

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

      {status &&
        <Status
          isOverDue={isOverDue}
        />
      }

      {dateToBeCompleted &&
        <Time
          isOverDue={isOverDue}
          timeDisplayType={timeDisplayType}
          dateToBeCompleted={dateToBeCompleted}
        />
      }

      {
        quantity &&
        <Quantity
          checkState={checkState}
          isOverDue={isOverDue}
          quantity={quantity}
        />
      }

    </DisplayContainer>
  )

}

export default HoverToolbar