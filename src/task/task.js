import React, { useState } from "react";
import useTask from "../useTask";
import Moment from "react-moment";
import moment from "moment";

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

  const gradientColours = () => {

    const colors = [
      "transparent",
      "YellowGreen",
      "DarkOrange",
      "OrangeRed",
      "Red"
    ];

    let res;

    if (percentage >= 0 && percentage < 75) { res = colors[1]; }
    else if (percentage > 75 && percentage < 85) { res = colors[2]; }
    else if (percentage > 85 && percentage < 95) { res = colors[3]; }
    else if (percentage > 95 && percentage < 100) { res = colors[4]; }
    else if (percentage > 100) { res = "transparent"; } else { res = colors[0] }
    // console.log(res);
    // console.log(percentage)
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

      <div>

        <Moment
          interval={60000}
          style={{
            position: "relative",
            fontSize: "8pt",
            top: "8px",
            color: "#aab2bd",
            marginRight: "5px"
          }}
          to={dateToBeCompleted}
        />

        <svg width="8" height="8" style={{
          position: "relative",
          top: "9px"
        }}><path d="M4 4h1v.666H3.334v-2H4zm3-.334h-.356a2.756 2.756 0 00-.882-1.697C5.333 1.58 5.351 1.22 5.143 0H2.525c-.21 1.22-.191 1.58-.62 1.969a2.752 2.752 0 00.001 4.083c.427.389.411.756.618 1.948h2.618c.207-1.192.191-1.56.618-1.948a2.757 2.757 0 00.887-1.718H7zm-3.166 2.5a2.167 2.167 0 110-4.333 2.167 2.167 0 010 4.333z" /></svg>

        <DeleteButton
          onClick={() => deleteTask(id)}>
          x
      </DeleteButton>

      </div>

      {/* <input type="date"
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
      /> */}

      <select
        style={{
          position: "absolute",
          top: 0,
          right: "-185px"
        }}
        onChange={event => {
          console.log(event.target.value);
          return (updateDateToBeCompleted(
            id,
            event.target.value
          ))
        }}>
        <option value={new Date(moment().add('minutes', 1))}>1 minute</option>
        <option value={new Date(moment().add('minutes', 5))}>5 minutes</option>
        <option value={new Date(moment().add('minutes', 10))}>10 minutes</option>
        <option value={new Date(moment().add('minutes', 15))}>15 minutes</option>
        <option value={new Date(moment().add('minutes', 20))}>20 minutes</option>
        <option value={new Date(moment().add('minutes', 25))}>25 minutes</option>
        <option value={new Date(moment().add('minutes', 30))}>30 minutes</option>
        <option value={new Date(moment().add('minutes', 60))}>1 Hour</option>
        <option value={new Date(moment().add('minutes', 120))}>2 hours</option>
      </select>


      <div
        ref={elem => (barRef = elem)}
        style={{
          height: "3px",
          maxWidth: "100%",
          transition: "1s cubic-bezier(0.5,0.5,0.5,0.5)",
          transitionProperty: "background-color, width",
          width: `${percentage}%`,
          position: "absolute",
          bottom: "-1px",
          left: 0,
          pointerEvents: "none",
          zIndex: 0
        }}
      />



    </Container >

  );

};

export default Expression;
