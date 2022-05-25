import React, { useState } from "react"
import useTask from "../useTask"
import { map } from "ramda"
import timeConfig from "./time-config.json"
import {
  TimeContainerBackground,
  TimeContainer
} from "./time.styled"
import TimeButton from "../buttons/timeButton"
import dayjs from "dayjs"
import Calendar from 'react-calendar'

const Time = ({
  id,
  isOverDue
}) => {

  const [isOpen, setIsOpen] = useState(false);

  const {
    updateDateToBeCompleted
  } = useTask();

  return (

    <>

      <TimeButton
        isOverDue={isOverDue}
        handleClick={() => setIsOpen(!isOpen)}
         />

      {
        isOpen &&
        <TimeContainerBackground
          // onClick={() => setIsOpen(false)}
          >

          {/* <button
            onPointerUp={() => {
              setIsOpen(false);
              updateDateToBeCompleted(
                id,
                dayjs().add(10, "minute").toString(),
                'at'
              )
            }
            }
            style={{ backgroundColor: 'black', color: 'white', padding: 10 }}>
            at
          </button> */}

          {/* <Calendar 
            onChange={date => {
            setIsOpen(false);
            console.log(date.toISOString())
            updateDateToBeCompleted(
              id,
              dayjs(date).toString(),
              'on'
            );
          }}/> */}

          <div style={{ backgroundColor: 'black', color: 'white' }}>
            in
            {
            map(({ text, time, range }) =>
              <TimeContainer
                onClick={() => {
                  setIsOpen(false);
                  updateDateToBeCompleted(
                    id,
                    dayjs().add(time, range).toString(),
                    'in'
                  );
                }}>
                {text}
              </TimeContainer>
            )(timeConfig)

          }
          </div>

          {/* <p style={{ backgroundColor: 'black', color: 'white' }}>on</p> */}

        </TimeContainerBackground>
      }



    </>

  )

};

export default Time;