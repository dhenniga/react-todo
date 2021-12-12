import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Chevron,
  ChevronPath,
  Input,
  Header,
  ToggleSelectAll,
  DeleteGroupButton
} from "./task-group.styled";
import useTask from "../useTask";
import { map, sort, pipe } from 'ramda'
import dayjs from "dayjs";

const Group = ({
  children,
  title,
  node,
  onSelectAll,
  onSelectNone
}) => {

  const {
    allSelected,
    renameGroup,
    deleteGroup
  } = useTask();

  const [checked, setChecked] = useState(allSelected(node))
  const [isOpen, setIsOpen] = useState(false)
  const [timeUpdate, setTimeUpdate] = useState(node?.lastUpdate)
  const ref = useRef()

  useEffect(() => {
    let arr = []
    map(item => arr.push(item.lastUpdated))(node)
    setTimeUpdate(sort((a, b) => b.localeCompare(a), arr).shift())
  }, [node])

  return (

    <Container
      isOpen={isOpen}
      thingHeight={ref?.current?.clientHeight}>

      <Header
        isOpen={isOpen}>

        <Chevron
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}>
          <svg
            width="16"
            height="8">
            <ChevronPath d="M16 0h-4.283L8 3.717 4.283 0H0l8 8z" />
          </svg>
        </Chevron>

        <div style={{
          display: isOpen ? "block" : "grid",
          gridTemplateRow: "1fr 1fr"
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

          {!isOpen && <span
            style={{
              fontSize: '8pt',
              color: 'rgba(120, 120, 120)'

            }}>
            Updated: <span style={{ fontWeight: 'bold' }}>{dayjs().to(dayjs(new Date(timeUpdate)))}</span>
          </span>}

        </div>



        {isOpen &&
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

        <DeleteGroupButton
          isOpen={isOpen}
          onClick={() => deleteGroup(title)}>
          X
        </DeleteGroupButton>

      </Header>

      <div ref={ref}
        style={{
          transition: 'opacity 0.3s cubic-bezier(0.5, 0.2, 0, 1)',
          opacity: isOpen ? 1 : 0
        }}>
        {children}
      </div>

    </Container>

  );

};

export default Group;
