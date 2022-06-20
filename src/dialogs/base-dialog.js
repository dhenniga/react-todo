import React from 'react'
import {
  Container,
  Text,
  Button
} from './base-dialog.styled'

const handleClick = () => {
  const modal = document.getElementById('modal')
  modal.replaceChildren()
  modal.style.display = 'none'
}

const BaseDialog = ({ text, confirmButtonText, cancelButtonText, confirmFunction, accentColor }) => {
  return (
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
  )
}

export default BaseDialog