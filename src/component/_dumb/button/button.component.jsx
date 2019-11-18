import React from 'react'
import { StyledButton } from './button.style'

const Button = ({ label, onClick, color, marginLeft, icon }) => {
  return (
    <StyledButton
      color={color}
      marginLeft={marginLeft}
      onClick={onClick}
      title={label}>
      {icon && <span className={`codetap-academy-${icon}`}></span>}
      <span>{label}</span>
    </StyledButton>
  )
}

export default Button
