import React, { useState, useEffect, useRef, Fragment } from "react";
import useTask from "../useTask";
import {
  Container,
  Checkbox,
  Input,
  SettingsContainer,
  TimeContainer,
  StyledMoment,
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

/////////////////////////////////////////

const Task = ({
  id,
  text,
  isChecked,
  updateTasks,
  dateCreated,
  dateToBeCompleted,
  taskCompletedTime,
  quantity,
  note
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
  } = useTask(updateTasks);

  /////////////////////////////////////////

  const percentageRemaining = calculateRemainingPercentage(dateCreated, dateToBeCompleted);
  const [isActive, setIsActive] = useState(isChecked);
  const [percentage, setPercentage] = useState(percentageRemaining);
  const { gradientColours, isOverDue } = useTaskService(percentage, isActive);

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

  return (

    <Fragment>

      <Container
        isOverDue={isOverDue}
        checked={isActive}>

        <Checkbox
          type="checkbox"
          checked={isActive}
          onChange={() => {
            setIsActive(!isActive);
            toggleTask(id, isActive ? 0 : 1)
          }}
        />

        <Input
          type="text"
          checked={isActive}
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

              <StyledMoment
                interval={60000}
                to={dateToBeCompleted}
                isOverDue={isOverDue}
              />

              <WatchIcon
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
              updateTasks={updateTasks}
              isOverDue={isOverDue}
            />

            <NoteButton
              handleClick={() => isEmpty(note) && updateNote(id, " ")}
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

    </Fragment>

  );

};

export default Task;
