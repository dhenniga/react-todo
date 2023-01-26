import React, { useLayoutEffect, useState } from 'react'
import {
  Container,
  Text,
  Button,
  Outer
} from './base-dialog.styled'
import { createPortal } from "react-dom";



const PortalComponent = ({ children, onClose }) => {
  return createPortal(
    <div onClick={onClose}>
      {children}
    </div>,
    document.getElementById("modal")
  );
};



const BaseDialog = ({ text, confirmButtonText, cancelButtonText, confirmFunction, accentColor }) => {

  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(() => {
    const modal = document.getElementById('modal')
    modal.style.pointerEvents = 'auto'
    setIsVisible(true)
  }, [])

  const handleClick = () => {
    const modal = document.getElementById('modal')
    // modal.replaceChildren()
    modal.style.pointerEvents = 'none'
    setIsVisible(false)
  }

  return (
    <PortalComponent onClose={() => setIsVisible(false)}>
      <Outer isVisible={isVisible}>
        <Container>
          <Text>{text}</Text>
          <div
            style={{
              display: 'grid',
              width: '100%',
              gridTemplateColumns: 'max-content max-content',
              justifyContent: 'end',
              columnGap: '10px'

            }}>
            <Button accentColor={accentColor} onClick={handleClick}>{confirmButtonText}</Button>
            <Button accentColor={accentColor} onClick={handleClick}>{cancelButtonText}</Button>
          </div>
        </Container>
      </Outer>
    </PortalComponent >
  )
}

export default BaseDialog