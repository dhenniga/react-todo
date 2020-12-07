import React, { useState, useEffect, useRef } from "react";
import useTask from "../useTask";
import Time from "../time/time";
import { Container, Checkbox, Input, SettingsContainer, TimeContainer, StyledMoment, TimePassingBar } from "./task.styled";
import DeleteButton from "../buttons/delete";

const Expression = ({
  id,
  text,
  isChecked,
  updateTasks,
  dateCreated,
  dateToBeCompleted,
  taskCompletedTime
}) => {

  const {
    toggleTask,
    deleteTask,
    renameTask,
    calculateRemainingPercentage
  } = useTask(updateTasks);


  let percentageRemaining = calculateRemainingPercentage(dateCreated, dateToBeCompleted);

  const barRef = useRef();
  const [isActive, setIsActive] = useState(isChecked);
  const [percentage, setPercentage] = useState(percentageRemaining);

  const gradientColours = () => {

    let res;

    const colors = [
      "transparent",
      "YellowGreen",
      "Orange",
      "OrangeRed",
      "Red"
    ];

    if (percentage >= 0 && percentage < 75) { res = colors[1]; }
    else if (percentage > 75 && percentage < 85) { res = colors[2]; }
    else if (percentage > 85 && percentage < 95) { res = colors[3]; }
    else if (percentage > 95 && percentage < 100) { res = colors[4]; }
    else if (percentage > 100) { res = "transparent"; } else { res = colors[0] }
    barRef.current.style.backgroundColor = res;
  }

  useEffect(() => {

    if (percentage >= 105 || !dateToBeCompleted || taskCompletedTime) { return "" };

    const intervalId = setInterval(() => {
      setPercentage(calculateRemainingPercentage(dateCreated, dateToBeCompleted));
      gradientColours();
    }, 1000);

    return () => clearInterval(intervalId);

  });

  return (

    <Container>

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
          />

          <svg
            width="12"
            height="12">
            <path d="M6 6h1.5v.999H5.003v-3H6zm4.5-.501h-.533a4.134 4.134 0 00-1.323-2.546C8 2.37 8.027 1.83 7.715 0H3.788c-.315 1.83-.286 2.37-.93 2.953a4.128 4.128 0 00.002 6.125c.64.584.616 1.134.927 2.922h3.927c.31-1.788.286-2.34.927-2.922a4.136 4.136 0 001.33-2.577h.53zm-4.748 3.75a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5z" />
          </svg>

        </TimeContainer>
      }

      <SettingsContainer>

        <Time
          id={id}
          dateCreated={dateCreated}
          dateToBeCompleted={dateToBeCompleted}
          updateTasks={updateTasks}
          taskCompletedTime={taskCompletedTime}
        />

        <DeleteButton
          handleClick={() => deleteTask(id)}
        />

      </SettingsContainer>

      <TimePassingBar
        percentage={percentage}
        ref={barRef}
      />

    </Container >

  );

};

export default Expression;
