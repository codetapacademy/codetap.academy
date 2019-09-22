import React from 'react'
import { StyledPillHalf, StyledPill } from './pill.style'

const Pill = ({ label, value }) => {
  return (
    <StyledPill>
      <StyledPillHalf>{label}</StyledPillHalf>
      <StyledPillHalf value={value}>{value}</StyledPillHalf>
    </StyledPill>
  )
}

export default Pill