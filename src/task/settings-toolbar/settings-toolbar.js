import React from 'react';
import { SettingsContainer } from '../task.styled'
import { isEmpty } from "ramda";

// Hook
import useTask from "../../useTask";

// Components
import Time from "../../time/time";
import DeleteButton from "../../buttons/delete";
import NoteButton from "../../buttons/note";

const SettingsToolbar = ({
  id,
  status,
  quantity,
  isOverDue,
  note
}) => {

  const {
    deleteTask,
    changeQuantity,
    updateNote,
    updateStatus
  } = useTask()

  return <SettingsContainer>

    <button
      style={{ fontSize: '8px' }}
      onClick={() => updateStatus(id, status ? undefined : 'In Progress...')}>
      {status ? 'Clear' : 'Start'}
    </button>

    <input style={{
      fontFamily: "sans-serif",
      width: "25px",
      margin: "0px 5px"
    }}
      min="1"
      type="number"
      defaultValue={quantity}
      onChange={e => changeQuantity(id, e.target.value)} />

    <Time
      id={id}
      isOverDue={isOverDue}
    />

    <NoteButton
      handleClick={() => isEmpty(note) && updateNote(id, ' ')}
      isOverDue={isOverDue}
    />

    <DeleteButton
      handleClick={() => {
        document.getElementById(id).style.opacity = "0"
        deleteTask(id)
      }}
      isOverDue={isOverDue}
    />

  </SettingsContainer>

}

export default SettingsToolbar