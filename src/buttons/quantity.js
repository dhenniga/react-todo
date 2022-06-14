import React from "react"
import BaseButton from './base-button'

const QuantityButton = ({ quantity, handleChange }) =>

<BaseButton>
<input style={{
  fontFamily: "rc_regular",
  width: "25px",
  margin: "0px 5px"
}}
  min="1"
  type="number"
  defaultValue={quantity}
  onChange={handleChange} />
</BaseButton>

export default QuantityButton