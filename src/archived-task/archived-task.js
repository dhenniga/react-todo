import React, { useState, useEffect, useRef } from "react";

// Hook
import useTask from "../useTask";

//  Styled Components
import {
  Container,
  Checkbox,
  Input
} from "../task/task.styled";

// Utils
import useTaskService from "../task/task.service";
import dayjs from "dayjs";
import RelativeTime from 'dayjs/plugin/relativeTime';

// Components
import Note from '../task/note/note'
// import SettingsToolbar from "../task/settings-toolbar/settings-toolbar"
// import HoverToolbar from '../task/hover-toolbar/hover-toolbar'

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
    calculateRemainingPercentage,
    updateStatus
  } = useTask()

  /////////////////////////////////////////

  const percentageRemaining = calculateRemainingPercentage(dateCreated, dateToBeCompleted)
  const [percentage, setPercentage] = useState(percentageRemaining)
  const { gradientColors, isOverDue } = useTaskService(percentage, isChecked)

  /////////////////////////////////////////

  const [checkState, setCheckState] = useState(isChecked)
  useEffect(() => setCheckState(isChecked), [isChecked])

  /////////////////////////////////////////

  useEffect(() => {

    if (percentage >= 101 || !dateToBeCompleted || taskCompletedTime) { return "" }

    const intervalId = setInterval(() => {
      setPercentage(percentageRemaining);
      gradientColors(barRef, percentage);
    }, 1000);

    return () => clearInterval(intervalId);

  }, [
    calculateRemainingPercentage,
    dateCreated,
    dateToBeCompleted,
    gradientColors,
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
          updateStatus(id, undefined)
        }}
      />

      <Input
        type="text"
        checked={checkState}
        isOverDue={isOverDue}
        onBlur={event => renameTask(id, event.target.value)}
        defaultValue={text}
        onChange={() => { }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.target.blur()
          }
        }}
        placeholder="Enter task name..."
      />

      {/* <HoverToolbar
        quantity={quantity}
        dateToBeCompleted={dateToBeCompleted}
        status={status}
        isOverDue={isOverDue}
        timeDisplayType={timeDisplayType}
        checkState={checkState}
      /> */}

      {/* {!checkState &&
        <SettingsToolbar
          id={id}
          status={status}
          quantity={quantity}
          isOverDue={isOverDue}
          note={note}
        />
      } */}

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
