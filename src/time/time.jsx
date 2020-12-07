import React, { Fragment, useState } from "react";
import useTask from "../useTask";
import moment from "moment";
import styled from "styled-components";

const Button = styled.button`
  border: 0px;
  background-color: transparent;
  margin: 0px 5px;
  padding: 0;
  height: 16px;
  width: 16px;
`;

const TimeContainerBackground = styled.div`
  background-color: rgba(0,0,0,0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  justify-content: center;
  align-items: center;
`;


const Time = ({
  id,
  updateTasks
}) => {

  const [isOpen, setIsOpen] = useState(false);

  const {
    updateDateToBeCompleted
  } = useTask(updateTasks);

  return (

    <Fragment>

      <Button
        onClick={() => setIsOpen(!isOpen)}>

        <svg
          width="16"
          height="16"
          clip-rule="evenodd"
          fill-rule="evenodd">
          <path d="M12.086 1.583c-.552 0-1.105.156-1.586.469a7.035 7.035 0 014.033 4.03 2.913 2.913 0 00-2.447-4.499M8 13.25a4.673 4.673 0 01-4.667-4.667A4.673 4.673 0 018 3.916a4.673 4.673 0 014.668 4.667A4.673 4.673 0 018 13.25m5.835-4.667a5.834 5.834 0 10-11.67 0c0 2.518 1.802 5.834 5.835 5.834 4.043 0 5.835-3.321 5.835-5.834m-12.367-2.5a2.913 2.913 0 014.031-4.031 7.022 7.022 0 00-4.031 4.031m7.114 2.5V5.666H7.416V9.75h3.5V8.583z" />
        </svg>

      </Button>


      {isOpen && <TimeContainerBackground>

        <select
          onChange={event => {
            setIsOpen(false);
            return (updateDateToBeCompleted(id, event.target.value))
          }}>
          <option disabled selected value>select a time</option>
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

      </TimeContainerBackground>}

    </Fragment>

  )

};

export default Time;