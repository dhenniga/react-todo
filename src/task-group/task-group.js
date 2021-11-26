import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Chevron,
  ChevronPath,
  Input,
  Header,
  ToggleSelectAll
} from "./task-group.styled";
import useTask from "../useTask";

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
  const [isOpen, setIsOpen] = useState(true)
  const ref = useRef()

  useEffect(() => {
    console.log(ref.current.clientHeight)
  }, [])

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
            Updated: <span style={{ fontWeight: 'bold' }}>20 minutes ago</span>
          </span>}

        </div>



        {isOpen && <><ToggleSelectAll
          type="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            checked
              ? onSelectNone(title)
              : onSelectAll(title)
          }} />

          <button
            style={{ width: 18, padding: 0, margin: 0, backgroundColor: "red", color: 'white', border: 0, outline: 0, borderRadius: 50, fontSize: '7pt', fontWeight: 900, height: '18px' }}
            onClick={() => deleteGroup(title)}
          >X</button>
        </>}

      </Header>

      <div ref={ref}
        style={{
          transition: 'opacity 0.3s cubic-bezier(0.5, 0.2, 0, 1)',
          // transitionDelay: '00ms',
          opacity: isOpen ? 1 : 0
        }}>
        {children}
      </div>

    </Container>

  );

};

export default Group;
