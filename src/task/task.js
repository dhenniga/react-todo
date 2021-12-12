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
  DisplayContainer,
  NoteContainer,
  NoteText
} from "./task.styled";
import { isEmpty } from "ramda";
import Time from "../time/time";
import DeleteButton from "../buttons/delete";
import useTaskService from "./task.service";
import WatchIcon from "../buttons/watch-icon";
import NoteButton from "../buttons/note";
import dayjs from "dayjs";
import RelativeTime from 'dayjs/plugin/relativeTime';
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

  const barRef = useRef();

  /////////////////////////////////////////

  const {
    toggleTask,
    deleteTask,
    renameTask,
    calculateRemainingPercentage,
    changeQuantity,
    updateNote
  } = useTask();

  /////////////////////////////////////////

  const percentageRemaining = calculateRemainingPercentage(dateCreated, dateToBeCompleted);
  const [isActive, setIsActive] = useState(isChecked);
  const [percentage, setPercentage] = useState(percentageRemaining);
  const { gradientColours, isOverDue } = useTaskService(percentage, isChecked);

  /////////////////////////////////////////

  useEffect(() => {

    if (percentage >= 101 || !dateToBeCompleted || taskCompletedTime) { return "" };

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

  useEffect(() => {
    setIsActive(isChecked)
  }, [isChecked])

  return (

    <>

      <Container
        isOverDue={isOverDue}
        checked={isChecked}>

        <Checkbox
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            setIsActive(!isChecked);
            toggleTask(id, isChecked ? 0 : 1)
          }}
        />

        <Input
          type="text"
          checked={isChecked}
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
              checked={isActive}
              isOverDue={isOverDue}>
              {quantity}
            </QuantityContainer>
          }

        </DisplayContainer>

        {!isActive &&
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
              handleClick={() => deleteTask(id)}
              isOverDue={isOverDue}
            />

          </SettingsContainer>
        }

        <TimePassingBar
          ref={barRef}
          checked={isActive}
          percentage={percentage}
          isOverDue={isOverDue}
        />

      </Container >

      {
        note &&
        <NoteContainer>

          <NoteText
            contentEditable
            onBlur={e =>
              updateNote(id, e.target.textContent)
            }>
            {note}
          </NoteText>

        </NoteContainer>
      }

    </>

  );

};

export default Task;
