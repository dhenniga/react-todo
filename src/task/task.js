import React, { useState, useEffect, useRef } from "react";
import useTask from "../useTask";
import Time from "../time/time";
import {
  Container,
  Checkbox,
  Input,
  SettingsContainer,
  TimeContainer,
  StyledMoment,
  TimePassingBar
} from "./task.styled";
import DeleteButton from "../buttons/delete";
import useTaskService from "./task.service";
import WatchIcon from "../buttons/watch-icon";

const Task = ({
  id,
  text,
  isChecked,
  updateTasks,
  dateCreated,
  dateToBeCompleted,
  taskCompletedTime
}) => {

  const barRef = useRef();

  const {
    toggleTask,
    deleteTask,
    renameTask,
    calculateRemainingPercentage
  } = useTask(updateTasks);

  const [isActive, setIsActive] = useState(isChecked);
  const [percentage, setPercentage] = useState(0);

  const {
    gradientColours,
    isOverDue
  } = useTaskService(percentage, isActive);

  useEffect(() => {

    if (percentage >= 101 || !dateToBeCompleted || taskCompletedTime) { return "" };

    const intervalId = setInterval(() => {
      setPercentage(calculateRemainingPercentage(dateCreated, dateToBeCompleted));
      gradientColours(barRef, percentage);
    }, 1000);

    return () => clearInterval(intervalId);

  }, [calculateRemainingPercentage, dateCreated, dateToBeCompleted, gradientColours, isOverDue, percentage, taskCompletedTime]);

  return (

    <Container
      isOverDue={isOverDue}>

      <Checkbox
        type="checkbox"
        checked={isActive}
        onChange={() => {
          setIsActive(!isActive);
          toggleTask(id, isActive)
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

      <SettingsContainer>

        <Time
          id={id}
          updateTasks={updateTasks}
          isOverDue={isOverDue}
        />

        <DeleteButton
          handleClick={() => deleteTask(id)}
          isOverDue={isOverDue}
        />

      </SettingsContainer>

      <TimePassingBar
        ref={barRef}
        percentage={percentage}
        isOverDue={isOverDue}
      />

    </Container >

  );

};

export default Task;
