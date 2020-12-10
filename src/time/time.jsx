import React, { Fragment, useState } from "react";
import useTask from "../useTask";
import moment from "moment";
import { map, prop } from "ramda";
import timeConfig from "./time-config.json";
import {
  TimeContainerBackground,
  TimeContainer
} from "./time.styled";
import TimeButton from "../buttons/timeButton";

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

      {isOpen && <TimeContainerBackground>

        {
          map(item =>
            <TimeContainer
              onClick={() => {
                setIsOpen(false);
                updateDateToBeCompleted(
                  id,
                  moment().add(
                    prop("range", item),
                    prop("time", item)
                  )
                );
              }}>
              {prop("text", item)}
            </TimeContainer>
          )(timeConfig)

        }

      </TimeContainerBackground>}

    </Fragment>

  )

};

export default Time;