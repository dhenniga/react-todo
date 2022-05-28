import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import useTask from "../../useTask";
import { NoteContainer, NoteText } from "./note.styled";
import dayjs from "dayjs";
import RelativeTime from 'dayjs/plugin/relativeTime'


dayjs.extend(RelativeTime)

const Note = ({ id, note }) => {

  const { updateNote } = useTask()
  const [value, setValue] = useState(note)
  const noteTextRef = useRef()
  const onChange = e => setValue(e.target.value)
  const onBlur = e => {
    updateNote(id, e.target.value).then(() => {
      console.log(note)
      setValue(note)
    })
  }

  // const updateNoteHeight = () => {
  //   if (noteTextRef !== null) {
  //     noteTextRef.current.style.height = "inherit"
  //     noteTextRef.current.style.height = Math.max(
  //       noteTextRef.current.scrollHeight,
  //       20
  //     ) + 'px'
  //   }
  // }

  // useLayoutEffect(updateNoteHeight, [value])
  // useEffect(() => window.onresize = updateNoteHeight)

  return <NoteContainer>

    <NoteText
      ref={noteTextRef}
      onChange={onChange}
      onBlur={onBlur}
      defaultValue={note}
    />

  </NoteContainer>

}

export default Note
