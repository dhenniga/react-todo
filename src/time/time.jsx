import React, { Fragment, useState, useEffect } from "react";
import useTask from "../useTask";
import Moment from "react-moment";
import moment from "moment";

let barRef = null;

const Time = ({
  id,
  dateCreated,
  dateToBeCompleted,
  updateTasks
}) => {

  const {
    calculateRemainingPercentage,
    updateDateToBeCompleted
  } = useTask(updateTasks);

  let percentageRemaining = calculateRemainingPercentage(dateCreated, dateToBeCompleted);

  const [percentage, setPercentage] = useState(percentageRemaining);

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

  useEffect(() => {

    if (percentage >= 105 || !dateToBeCompleted) { return "" };

    const intervalId = setInterval(() => {
      setPercentage(calculateRemainingPercentage(dateCreated, dateToBeCompleted));
      gradientColours();
    }, 1000);

    return () => clearInterval(intervalId);

  });




  return (

    <Fragment>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr max-content max-content",
          alignItems: "center"
        }}>



        {
          dateToBeCompleted &&
          <Fragment>
            <Moment
              interval={60000}
              style={{
                // position: "relative",
                fontSize: "8pt",
                // top: "9px",
                color: "#656d78",
                marginRight: "5px"
              }}
              to={dateToBeCompleted}
            />

            <svg
              width="12"
              height="12"
              style={{
                marginRight: "5px"
              }}>
              <path d="M6 6h1.5v.999H5.003v-3H6zm4.5-.501h-.533a4.134 4.134 0 00-1.323-2.546C8 2.37 8.027 1.83 7.715 0H3.788c-.315 1.83-.286 2.37-.93 2.953a4.128 4.128 0 00.002 6.125c.64.584.616 1.134.927 2.922h3.927c.31-1.788.286-2.34.927-2.922a4.136 4.136 0 001.33-2.577h.53zm-4.748 3.75a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5z" />
            </svg>
          </Fragment>
        }

      </div>


      <select
        style={{
          position: "absolute",
          top: 0,
          right: "-110px",
          zIndex: 2000
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

    </Fragment>

  )
}

export default Time;