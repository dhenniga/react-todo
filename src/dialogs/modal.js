import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import useTask from '../useTask'

const Container = styled.div`
  background-color: rgb(255,0,100);
  border-radius: 3px;
  display: grid;
  position: absolute;
  color: white;
  padding: 0px 15px;
  grid-template-columns: 1fr max-content max-content;
  width: calc(100% - 15px);
  height: 100%;
  top: 0,
  left: 0,
  justify-items: left;
  align-items: center;
  zIndex: 2000;
`

const Label = styled.label`
  background-color: transparent;
  color: white;
  font-size: 12px;
`

const Button = styled.button`
  z-index: 2000;
  background-color: white;
  color: rgb(255,0,100);
  font-size: 11px;
  border: none;
  outline: 0px;
  border-radius: 3px;
  padding: 5px 10px;

`

const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  outline: 0px;
  border: 0px;
  background-color: transparent;
  width: 0px;
  height: 0px;
  overflow: hidden;
`

const Modal = ({
  id,
  text,
  setHasModal,
  setCheckState,
  setCompletedTime
}) => {

  const {
    toggleTask,
    updateStatus,
    updateTaskCompletedTime
  } = useTask()

  const hiddenRef = useRef()

  useEffect(() => {
    hiddenRef.current.focus()
  }, [])

  return (

    <>

      <HiddenInput
        ref={hiddenRef}
        onBlur={() => setHasModal(false)}
      />

      <Container>

        <Label>
          {text}
        </Label>

        <Button
          style={{ zIndex: 2000 }}
          onPointerDown={() => {
            setCheckState(false)
            toggleTask(id, false)
            setCompletedTime(undefined)
            updateTaskCompletedTime(id, undefined)
            updateStatus(id, undefined)
            setHasModal(false)
          }}>
          Reactivate
        </Button>
      </Container>

    </>

  )
}

export default Modal