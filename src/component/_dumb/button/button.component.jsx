import React from 'react'
import { StyledButton } from './button.style'

const Button = ({ label, onClick, color }) => {
  return (
    <StyledButton color={color} onClick={onClick}>{label}</StyledButton>
  )
}

export default Button
