import React, { useState } from "react";
import useTask from "../useTask";
import Moment from "react-moment";

import {
  Container,
  Checkbox,
  Input,
  DeleteButton
} from "./task.styled";

let barRef = null;

const Expression = ({
  id,
  text,
  isChecked,
  updateTasks,
  dateCreated,
  dateToBeCompleted
}) => {

  const {
    toggleTask,
    deleteTask,
    renameTask,
    calculateRemainingPercentage,
    updateDateToBeCompleted
  } = useTask(updateTasks);

  let percentageRemaining = calculateRemainingPercentage(dateCreated, dateToBeCompleted);

  const [isActive, setIsActive] = useState(isChecked);
  const [percentage, setPercentage] = useState(percentageRemaining);
  // const [finishDate, setFinishDate] = useState();

  const colors = [
    "YellowGreen",
    "DarkOrange",
    "OrangeRed",
    "Red"
  ];

  const gradientColours = () => {
    let res;
    if (percentage >= 0 && percentage < 75) { res = colors[0]; }
    else if (percentage > 76 && percentage < 85) { res = colors[1]; }
    else if (percentage > 86 && percentage < 94) { res = colors[2]; }
    else if (percentage > 95 && percentage < 99) { res = colors[3]; }
    else if (percentage > 100) { res = "transparent"; }
    console.log(res);
    console.log(percentage)
    barRef.style.backgroundColor = res;
  }

  React.useEffect(() => {

    if (percentage >= 105) { return "" };

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
        onBlur={event =>
          renameTask(
            id,
            event.target.value
          )}
        defaultValue={text}
        onChange={() => { }}
        placeholder="Enter task name"
      />

      <DeleteButton
        onClick={() => deleteTask(id)}>
        x
      </DeleteButton>

      <Moment
        interval={60000}
        style={{
          position: "absolute",
          fontSize: "8pt",
          top: "50%",
          transform: "translateY(-50%)",
          right: 30,
          color: "black"
        }}
        to={dateToBeCompleted}
      />

      <input type="date"
        style={{
          position: "absolute",
          top: 0,
          right: "-185px"
        }}
        onChange={event =>
          updateDateToBeCompleted(
            id,
            new Date(event.target.value)
          )
        }
      />


      <div
        ref={elem => (barRef = elem)}
        style={{
          height: "5px",

          maxWidth: "100%",
          transition: "1s cubic-bezier(0.5,0.5,0.5,0.5)",
          transitionProperty: "background-color, width",
          width: `${percentage}%`,
          position: "absolute",
          bottom: "-2.5px",
          left: 0,
          pointerEvents: "none",
          zIndex: 0
        }}
      />



    </Container>

  );

};

export default Expression;
