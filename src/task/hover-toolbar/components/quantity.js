import React from 'react'
import { QuantityContainer } from '../../task.styled';

const Quantity = ({ checkState, isOverDue, quantity }) =>

  <QuantityContainer
    checkState={checkState}
    isOverDue={isOverDue}>
    {quantity}
  </QuantityContainer>

export default Quantity
