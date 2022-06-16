import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Input,
  Header,
  ToggleSelectAll,
  // DeleteGroupButton,
  TaskGroupFooter,
  AddTask,
  ItemsRemaining
} from './task-group.styled';
import { values, reduce } from 'ramda'
import useTask from '../useTask';
import { map, sort } from 'ramda'
import dayjs from 'dayjs';
import DeleteButton from '../buttons/delete'
import BaseButton from '../buttons/base-button'
import Chevron from '../buttons/chevron'

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
  const [containerHeight, setContainerHeight] = useState(isExpanded)
  const containerRef = useRef()

  useEffect(() => {
    let arr = []
    map(item => arr.push(item.lastUpdated))(node)
    setTimeUpdate(sort((a, b) => b.localeCompare(a), arr).shift())
  }, [node])

  useEffect(() => setExpandLocalState(isExpanded), [isExpanded])
  useEffect(() => setContainerHeight(containerRef.current.scrollHeight))

  return (

    <Container
      id='tester-container'
      ref={containerRef}
      isExpanded={expandLocalState}
      containerHeight={containerHeight}>

      <Header
        className='header'
        isExpanded={expandLocalState}>

        <Chevron
          handleClick={() => {
            const toggledExpandState = !expandLocalState
            setExpandLocalState(toggledExpandState)
            toggleExpanded(rootKey, toggledExpandState)
            setContainerHeight(containerRef.current.scrollHeight)
          }}
          expandLocalState={expandLocalState}
        />

        <div style={{
          display: expandLocalState ? 'block' : 'grid',
          gridTemplateColumns: '1fr max-content'
        }}>
          <Input
            defaultValue={title}
            placeholder='Enter Group Name...'
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.target.blur()
              }
            }}
            onBlur={event =>
              renameGroup(
                node,
                event.target.value
              )}
          />

          {!expandLocalState && <span
            style={{
              fontSize: '10px',
              textAlign: 'right',
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

        {/* <div
          style={{
            display: expandLocalState ? 'grid' : 'none',
            height: '100%',
            gridTemplateColumns: 'max-content max-content',
            justifyItems: 'center',
            alignItems: 'center'
          }}> */}

          {expandLocalState &&
            <BaseButton>
              <ToggleSelectAll
                type='checkbox'
                checked={checked}
                onChange={() => {
                  setChecked(!checked);
                  checked
                    ? onSelectNone(title)
                    : onSelectAll(title)
                }} />
            </BaseButton>
          }

          {expandLocalState &&

            <DeleteButton
              isOverDue={false}
              handleClick={() => deleteGroup(title)}
              
            />

          }

        {/* </div> */}

      </Header>

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

    </Container >

  );

};

export default Group;
