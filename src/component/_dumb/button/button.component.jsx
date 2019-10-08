import React from 'react'
import { StyledButton } from './button.style'

const Button = ({ label, onClick, color, marginLeft }) => {
  return (
    <StyledButton
      color={color}
      marginLeft={marginLeft}
      onClick={onClick}
      title={label}>
      {label}
    </StyledButton>
  )
}

export default Button
