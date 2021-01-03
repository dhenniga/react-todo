import React, { Fragment, useState } from "react";
import useTask from "../useTask";
import { map } from "ramda";
import timeConfig from "./time-config.json";
import {
  TimeContainerBackground,
  TimeContainer
} from "./time.styled";
import TimeButton from "../buttons/timeButton";
import dayjs from "dayjs";

const Time = ({
  id,
  updateTasks,
  isOverDue
}) => {

  const [isOpen, setIsOpen] = useState(false);

  const {
    updateDateToBeCompleted
  } = useTask(updateTasks);

  return (

    <Fragment>

      <TimeButton
        isOverDue={isOverDue}
        handleClick={() => setIsOpen(!isOpen)} />

      {
        isOpen &&
        <TimeContainerBackground
          onClick={() => setIsOpen(false)}>

          {
            map(({ text, time, range }) =>
              <TimeContainer
                onClick={() => {
                  setIsOpen(false);
                  updateDateToBeCompleted(
                    id,
                    dayjs().add(time, range).toString()
                  );
                }}>
                {text}
              </TimeContainer>
            )(timeConfig)

          }

        </TimeContainerBackground>
      }

    </Fragment>

  )

};

export default Time;