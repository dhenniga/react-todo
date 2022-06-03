import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Chevron,
  ChevronPath,
  ChevronSVG,
  Input,
  Header,
  ToggleSelectAll,
  DeleteGroupButton,
  TaskGroupFooter,
  AddTask,
  ItemsRemaining
} from "./task-group.styled";
import { values, reduce } from "ramda"
import useTask from "../useTask";
import { map, sort } from 'ramda'
import dayjs from "dayjs";

const Group = ({
  rootKey,
  children,
  title,
  node,
  onSelectAll,
  onSelectNone,
  isExpanded
}) => {

  const {
    createTask,
    tasksRemainingCount,
    allSelected,
    renameGroup,
    deleteGroup,
    toggleExpanded
  } = useTask();

  const [checked, setChecked] = useState(allSelected(node))
  const [timeUpdate, setTimeUpdate] = useState(node?.lastUpdate)
  const [expandLocalState, setExpandLocalState] = useState(isExpanded)
  // const ref = useRef()
  const containerRef = useRef()

  useEffect(() => {
    let arr = []
    map(item => arr.push(item.lastUpdated))(node)
    setTimeUpdate(sort((a, b) => b.localeCompare(a), arr).shift())
  }, [node])

  useEffect(() => setExpandLocalState(isExpanded), [isExpanded])

  return (

    <Container
      id='tester-container'
      ref={containerRef}
      isExpanded={expandLocalState}>

      <Header
        className='header'
        isExpanded={expandLocalState}>

        <Chevron
          onClick={() => {
            const toggledExpandState = !expandLocalState
            setExpandLocalState(toggledExpandState)
            toggleExpanded(rootKey, toggledExpandState)
          }}>
          <ChevronSVG
            isExpanded={expandLocalState}
            width="9"
            height="9"
            viewBox="0 0 2.381 2.381">
            <ChevronPath
              d="M1.19.476a.239.238 0 0 0-.168.07l-.953.953a.239.238 0 0 0 .168.406h1.906a.239.238 0 0 0 .17-.407L1.358.546a.239.238 0 0 0-.169-.07z"
            />
          </ChevronSVG>
        </Chevron>

        <div style={{
          display: expandLocalState ? "block" : "grid",
          gridTemplateColumns: "1fr max-content"
        }}>
          <Input
            defaultValue={title}
            placeholder="Enter Group Name..."
            onBlur={event =>
              renameGroup(
                node,
                event.target.value
              )}
          />

          {!expandLocalState && <span
            style={{
              fontSize: '10px',
              textAlign: "right",
              lineHeight: '25px',
              color: 'rgba(120, 120, 120)',
              transition: 'opacity 0.3s cubic-bezier(0.5, 0.2, 0, 1)'
            }}>
            <span style={{
              fontWeight: 'bold',
              height: '25px'
            }}>{dayjs().to(dayjs(new Date(timeUpdate)))}</span>
          </span>}

        </div>



        {expandLocalState &&
          <ToggleSelectAll
            type="checkbox"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              checked
                ? onSelectNone(title)
                : onSelectAll(title)
            }} />
        }

        {expandLocalState &&
          <DeleteGroupButton
            onClick={() => deleteGroup(title)}>
            X
          </DeleteGroupButton>}

      </Header>

      {/* <div
        ref={ref}
        style={{
          transition: 'opacity 0.3s cubic-bezier(0.5, 0.2, 0, 1)',
          opacity: expandLocalState ? 1 : 0,
          height: !expandLocalState && '0px',
          overflow: 'visible'
        }}> */}

      {children}

      <TaskGroupFooter>

        <AddTask
          disabled={reduce((a, item) => a + !item.text, 0)(values(node))}
          onClick={() => createTask(rootKey)}>
          +
        </AddTask>

        <ItemsRemaining>
          {tasksRemainingCount(node)} items left
        </ItemsRemaining>

      </TaskGroupFooter>

      {/* </div> */}

    </Container>

  );

};

export default Group;
