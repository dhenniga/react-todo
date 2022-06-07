import React, { useState, useEffect, useRef } from "react";

// Hook
import useTask from "../../useTask";

//  Styled Components
import {
  TimePassingBar
} from "../task.styled";

// Utils
import useTaskService from "../task.service";
import dayjs from "dayjs";
import RelativeTime from 'dayjs/plugin/relativeTime';

/////////////////////////////////////////

dayjs.extend(RelativeTime);

/////////////////////////////////////////

const TimePassing = ({
  dateCreated,
  dateToBeCompleted,
  taskCompletedTime,
  checked
}) => {

  /////////////////////////////////////////

  const barRef = useRef()

  /////////////////////////////////////////

  const {
    calculateRemainingPercentage
  } = useTask()

  /////////////////////////////////////////

  const percentageRemaining = calculateRemainingPercentage(dateCreated, dateToBeCompleted)
  const [percentage, setPercentage] = useState(percentageRemaining)
  const { gradientColours, isOverDue } = useTaskService(percentage, checked)

  /////////////////////////////////////////

  useEffect(() => {

    if (percentage >= 101 || !dateToBeCompleted || taskCompletedTime) { return "" }

    const intervalId = setInterval(() => {
      setPercentage(percentageRemaining);
      gradientColours(barRef, percentage);
    }, 1000);

    return () => clearInterval(intervalId);

  }, [
    calculateRemainingPercentage,
    dateCreated,
    dateToBeCompleted,
    gradientColours,
    isOverDue,
    percentage,
    percentageRemaining,
    taskCompletedTime
  ]);

  /////////////////////////////////////////

  return (

    <TimePassingBar
      ref={barRef}
      checked={checked}
      percentage={percentage}
      isOverDue={isOverDue}
    />

  )
}

export default TimePassing;
