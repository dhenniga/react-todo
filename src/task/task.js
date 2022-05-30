import React, { useState, useEffect, useRef } from "react";
import useTask from "../useTask";
import {
  Container,
  Checkbox,
  Input,
  SettingsContainer,
  TimeContainer,
  TimeText,
  TimePassingBar,
  QuantityContainer,
  DisplayContainer
} from "./task.styled";
import { isEmpty } from "ramda";
import Time from "../time/time";
import DeleteButton from "../buttons/delete";
import useTaskService from "./task.service";
import WatchIcon from "../buttons/watch-icon";
import NoteButton from "../buttons/note";
import dayjs from "dayjs";
import RelativeTime from 'dayjs/plugin/relativeTime';
import Note from './note/note'

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
  timeDisplayType
}) => {

  /////////////////////////////////////////

  const barRef = useRef()

  /////////////////////////////////////////

  const {
    toggleTask,
    deleteTask,
    renameTask,
    calculateRemainingPercentage,
    changeQuantity,
    updateNote
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

  return (

    <>

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

        <DisplayContainer
          quantity={quantity}
          dateToBeCompleted={dateToBeCompleted}>

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

        {!checkState &&
          <SettingsContainer>

            <input style={{
              fontFamily: "sans-serif",
              width: "25px",
              margin: "0px 5px"
            }}
              min="1"
              type="number"
              defaultValue={quantity}
              onChange={e => changeQuantity(id, e.target.value)} />

            <Time
              id={id}
              isOverDue={isOverDue}
            />

            <NoteButton
              handleClick={() => isEmpty(note) && updateNote(id, ' ')}
              isOverDue={isOverDue}
            />

            <DeleteButton
              handleClick={() => {
                document.getElementById(id).style.opacity = "0"
                deleteTask(id)
              }}
              isOverDue={isOverDue}
            />

          </SettingsContainer>
        }

        <TimePassingBar
          ref={barRef}
          checked={checkState}
          percentage={percentage}
          isOverDue={isOverDue}
        />

      </Container>

      {note &&
        <Note
          id={id}
          note={note}
        />
      }

    </>

  );

};

export default Task;
