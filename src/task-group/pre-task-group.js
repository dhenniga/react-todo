
import React, { useRef, useLayoutEffect, useState } from 'react'
import {
  Chevron,
  ChevronPath,
  Input,
  Header
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

const PreGroup = () => {

  const ref = useRef()

  const {
    createTaskGroup,
  } = useTask();

  useLayoutEffect(() => {
    console.log(ref.current)
    ref.current.focus()
  }, [])

  return <Container id='demo'>

    <Header>

      <Chevron>
        <svg
          width="16"
          height="8">
          <ChevronPath d="M16 0h-4.283L8 3.717 4.283 0H0l8 8z" />
        </svg>
      </Chevron>

      <div style={{
        display: "grid",
        gridTemplateRow: "1fr 1fr"
      }}>
        <Input
          ref={ref}
          style={{ color: 'white' }}
          placeholder="Enter Group Name..."
          onFocus={() => console.log('focused')}
          onBlur={event => {
            const value = event.target.value
            value !== '' && createTaskGroup(value)
            // var myobj = document.getElementById("demo");
            // myobj.remove();
            document.getElementById('modal').style.display = 'none'
          }}
        />
      </div>

    </Header>

  </Container>



}

export default PreGroup
