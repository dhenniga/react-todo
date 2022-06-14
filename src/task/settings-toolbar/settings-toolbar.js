import React from 'react'
import { SettingsContainer } from '../task.styled'
import { isEmpty } from "ramda"

// Hook
import useTask from "../../useTask"

// Components
import Time from "../../time/time"
import DeleteButton from "../../buttons/delete"
import NoteButton from "../../buttons/note"
import QuantityButton from '../../buttons/quantity'
import StatusButton from '../../buttons/status'

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

    <StatusButton
      status={status}
      handleClick={() => updateStatus(id, status ? undefined : 'In Progress...')}
    />

    <QuantityButton
      quantity={quantity}
      handleChange={e => changeQuantity(id, e.target.value)}
    />

    <Time
      id={id}
      isOverDue={isOverDue}
    />

    <NoteButton
      isOverDue={isOverDue}
      handleClick={() => isEmpty(note) && updateNote(id, ' ')}
    />

    <DeleteButton
      isOverDue={isOverDue}
      handleClick={() => deleteTask(id)}
    />

  </SettingsContainer >

}

export default SettingsToolbar