import React, { 
  useState, 
  useEffect,
   useRef, 
  //  createElement 
  } from "react";
// import ReactDOM, { createPortal } from 'react-dom'

// Hook
import useTask from "../useTask";
import Modal from '../dialogs/modal'

//  Styled Components
import {
  Container,
  Checkbox,
  Input,
  TimePassingBar,
  TaskCompletedText
} from "./task.styled";
// import { useTheme } from 'styled-components'

// Utils
import useTaskService from "./task.service"
import dayjs from "dayjs"
import RelativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'

// Components
import Note from './note/note'
import SettingsToolbar from "./settings-toolbar/settings-toolbar"
import HoverToolbar from './hover-toolbar/hover-toolbar'
// import BaseDialog from '../dialogs/base-dialog'

/////////////////////////////////////////

dayjs.extend(RelativeTime)
dayjs.extend(advancedFormat)

/////////////////////////////////////////

const Task = ({
  id,
  text,
  isChecked,
  dateCreated,
  dateToBeCompleted,
  taskCompletedTime,
  quantity,
  note,
  timeDisplayType,
  status
}) => {

  // const accentColor = useTheme().accentColor

  /////////////////////////////////////////

  const barRef = useRef()
  // const modalRef = useRef()

  /////////////////////////////////////////

  const {
    toggleTask,
    renameTask,
    calculateRemainingPercentage,
    updateStatus,
    // addToArchive,
    updateTaskCompletedTime
  } = useTask()

  /////////////////////////////////////////

  const percentageRemaining = calculateRemainingPercentage(dateCreated, dateToBeCompleted)
  const [percentage, setPercentage] = useState(percentageRemaining)
  const { gradientColors, isOverDue } = useTaskService(percentage, isChecked)
  const [hasModal, setHasModal] = useState(false)

  /////////////////////////////////////////

  const [checkState, setCheckState] = useState(isChecked)
  useEffect(() => setCheckState(isChecked), [isChecked])

  /////////////////////////////////////////

  const [completedTime, setCompletedTime] = useState(taskCompletedTime)
  useEffect(() => setCompletedTime(taskCompletedTime), [taskCompletedTime])

  /////////////////////////////////////////

  useEffect(() => {

    if (percentage >= 101 || !dateToBeCompleted || taskCompletedTime) { return "" }

    const intervalId = setInterval(() => {
      setPercentage(percentageRemaining);
      gradientColors(barRef, percentage);
    }, 1000);

    return () => clearInterval(intervalId);

  }, [
    calculateRemainingPercentage,
    dateCreated,
    dateToBeCompleted,
    gradientColors,
    isOverDue,
    percentage,
    percentageRemaining,
    taskCompletedTime
  ]);

  /////////////////////////////////////////

  return <>

    <Container
      id={id}
      isOverDue={isOverDue}
      checked={checkState}
      taskCompletedTime={taskCompletedTime}>

      {hasModal &&
        <Modal
          id={id}
          text={text}
          setHasModal={setHasModal}
          setCheckState={setCheckState}
          setCompletedTime={setCompletedTime}
        />
      }

      <Checkbox
        type="checkbox"
        checked={checkState}
        onChange={() => {
          const toggledTaskState = !checkState
          const completedTimeState = toggledTaskState ? new Date() : undefined
          if (!checkState) {
            setCheckState(toggledTaskState)
            toggleTask(id, toggledTaskState)
            setCompletedTime(completedTimeState)
            updateTaskCompletedTime(id, completedTimeState)
            updateStatus(id, undefined)
          } else {
            setHasModal(true)

            // modal.style.display = 'inline'
            // ReactDOM.render(
            //   createElement(BaseDialog, {
            //     text: 'Are you sure you want to reactive this task?',
            //     confirmButtonText: 'Reactivate',
            //     cancelButtonText: 'Cancel',
            //     accentColor: accentColor
            //   }, null),
            //   modal)

            // <BaseDialog
            //   text='Are you sure you want to reactive this task?'
            //   confirmButtonText='Reactivate'
            //   cancelButtonText='Cancel'
            //   accentColor={accentColor}
            // />




          }
        }}
      />

      <Input
        type="text"
        checked={checkState}
        isOverDue={isOverDue}
        placeholder="Enter task name..."
        onBlur={event => renameTask(id, event.target.value)}
        defaultValue={text}
        onChange={() => { }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.target.blur()
          }
        }}
      />

      {!completedTime && <HoverToolbar
        quantity={quantity}
        dateToBeCompleted={dateToBeCompleted}
        status={status}
        isOverDue={isOverDue}
        timeDisplayType={timeDisplayType}
        checkState={checkState}
      />}

      {!checkState && !completedTime &&
        <SettingsToolbar
          id={id}
          status={status}
          quantity={quantity}
          isOverDue={isOverDue}
          note={note}
          taskCompletedTime={taskCompletedTime}
        />
      }

      <TimePassingBar
        ref={barRef}
        checked={checkState}
        percentage={percentage}
        isOverDue={isOverDue}
      />

      {/* <button onClick={() => addToArchive(id)}>Arch</button> */}

      {completedTime &&
        <TaskCompletedText>
          {dayjs(completedTime).format('hh:mma - Do MMM')}
        </TaskCompletedText>
      }

    </Container>

    {note &&
      <Note
        id={id}
        note={note}
      />
    }

  </>

};

export default Task;
