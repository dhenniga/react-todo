
import React, { useRef, useEffect } from 'react'
import {
  Input
} from "./task-group.styled";
import useTask from "../useTask";
import styled from 'styled-components'

export const Container = styled.div`
  text-align: left;
  padding: 10px 15px;
  margin: 10px 10px 0px 10px;
  position: relative;
  width: calc(100% - 50px);
  display: inline-block;
  background-color: rgba(255,0,100,0.1);
  border-radius: 5px;
  overflow: hidden;
  padding-bottom: 20px;
  height: 30px !important;
`;

const Blob = styled.div`
  border-bottom: 2px solid rgba(0,0,0,0);
  display: grid;
  transition: all 0.3s cubic-bezier(0.5, 0.2, 0, 1);
  grid-template-columns: 1fr;
  align-items: center;
  min-height: 58px;
  background-color: purple;
  width: 200px;
`

const PreGroup = () => {

  const ref = useRef()

  const {
    createTaskGroup,
  } = useTask();

  useEffect(() => {
    ref.current.focus()
  }, [])

  return <Container id='demo'>

    <Blob>

      <Input
        ref={ref}
        style={{ color: 'white' }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.target.blur()
          }
        }}
        placeholder="Enter Group Name..."
        onFocus={() => console.log('focused')}
        onBlur={event => {
          const value = event.target.value
          value !== '' && createTaskGroup(value)
          // let myObj = document.getElementById("demo");
          // myObj.remove();
          document.getElementById('modal').style.display = 'none'
        }}
      />

    </Blob>

  </Container>



}

export default PreGroup
