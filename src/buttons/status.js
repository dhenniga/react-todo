import React from "react"
import BaseButton from './base-button'

const StatusButton = ({ status, handleClick }) =>

  <BaseButton>
    <button
      style={{
        fontSize: '8px',
        color: 'rgb(128,128,128)',
        borderColor: 'rgb(128,128,128)',
        backgroundColor: 'transparent',
        borderWidth: '1px'
      }}
      onClick={handleClick}>
      {status ? 'C' : 'S'}
    </button>
  </BaseButton>

export default StatusButton