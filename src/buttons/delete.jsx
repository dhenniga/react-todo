import React from "react"
import BaseButton from './base-button'

const DeleteButton = ({ isOverDue, handleClick }) =>
  <BaseButton
    handleClick={handleClick}>
    <svg
      width="16"
      height="16">
      <path
        d="M8 1a7 7 0 100 14A7 7 0 008 1zm2.421 10.467L8.005 9.074 5.603 11.5l-1.07-1.069 2.395-2.425L4.5 5.603l1.07-1.069 2.423 2.393L10.388 4.5l1.079 1.079-2.392 2.415 2.425 2.394z"
        fill={isOverDue ? "white" : "red"}
      />
    </svg>
  </BaseButton>

export default DeleteButton