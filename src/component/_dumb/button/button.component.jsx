import React from 'react'
import { StyledButton } from './button.style'

const Button = ({ label, onClick, color, marginLeft, icon, disabled }) => {
  return (
    <StyledButton
      color={color}
      marginLeft={marginLeft}
      onClick={onClick}
      disabled={disabled}
      title={label}>
      {icon && <span className={`codetap-academy-${icon}`}></span>}
      <span>{label}</span>
    </StyledButton>
  )
}

export default Button
