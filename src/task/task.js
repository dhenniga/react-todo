import React, { useState, useEffect, useRef } from "react";

// Hook
import useTask from "../useTask";

//  Styled Components
import {
  Container,
  Checkbox,
  Input,
  TimePassingBar
} from "./task.styled";

// Utils
import useTaskService from "./task.service";
import dayjs from "dayjs";
import RelativeTime from 'dayjs/plugin/relativeTime';

// Components
import Note from './note/note'
import SettingsToolbar from "./settings-toolbar/settings-toolbar"
import HoverToolbar from './hover-toolbar/hover-toolbar'
import TimePassing from './time-passing-bar'

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
    toggleTask,
    renameTask,
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
      checked={checkState}>

      <Checkbox
        type="checkbox"
        checked={checkState}
        onChange={() => {
          const toggledTaskState = !checkState
          setCheckState(toggledTaskState)
          toggleTask(id, toggledTaskState)
        }}
      />

      <Input
        type="text"
        checked={checkState}
        isOverDue={isOverDue}
        onBlur={event => renameTask(id, event.target.value)}
        defaultValue={text}
        onChange={() => { }}
        placeholder="Enter task name..."
      />

      <HoverToolbar
        quantity={quantity}
        dateToBeCompleted={dateToBeCompleted}
        status={status}
        isOverDue={isOverDue}
        timeDisplayType={timeDisplayType}
        checkState={checkState}
      />

      {!checkState &&
        <SettingsToolbar
          id={id}
          status={status}
          quantity={quantity}
          isOverDue={isOverDue}
          note={note}
        />
      }

      <TimePassing
        dateCreated={dateCreated}
        dateToBeCompleted={dateToBeCompleted}
        taskCompletedTime={taskCompletedTime}
        checked={checkState}
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
