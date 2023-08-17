import React, { useState, useEffect, useRef } from "react";

// Hook
import useTask from "../useTask";

//  Styled Components
import {
  Container,
  Checkbox,
  Input
} from "./archived-task.styled";

// Utils
import useTaskService from "../task/task.service";
import dayjs from "dayjs";
import RelativeTime from 'dayjs/plugin/relativeTime';

// Components
import Note from '../task/note/note'
import HoverToolbar from '../task/hover-toolbar/hover-toolbar'

/////////////////////////////////////////

dayjs.extend(RelativeTime);

/////////////////////////////////////////

const Task = ({
  id,
  text,
  isChecked,
  dateCreated,
  dateToBeCompleted,
  taskCompletedTime,
  quantity,
  note,
  timeDisplayType,
  status
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
  const { gradientColours, isOverDue } = useTaskService(percentage, isChecked)

  /////////////////////////////////////////

  const [checkState, setCheckState] = useState(isChecked)
  useEffect(() => setCheckState(isChecked), [isChecked])

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

  return <>

    <Container
      id={id}
      isOverDue={isOverDue}
      checked={checkState}
      taskCompletedTime={taskCompletedTime}>

      <Checkbox
        type="checkbox"
        checked={checkState}
      />

      <Input
        type="text"
        disabled
        checked={checkState}
        isOverDue={isOverDue}
        defaultValue={text}
      />

      <HoverToolbar
        quantity={quantity}
        dateToBeCompleted={dateToBeCompleted}
        status={status}
        isOverDue={isOverDue}
        timeDisplayType={timeDisplayType}
        checkState={checkState}
      />

    </Container>

    {note &&
      <Note
        id={id}
        note={note}
      />
    }

  </>

};

export default Task;
