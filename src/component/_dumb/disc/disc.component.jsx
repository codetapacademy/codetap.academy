import React from 'react'
import { StyledDisc } from './disc.style'

const Disc = ({ title, image, color, onClick, children }) => {
  return (
    <StyledDisc
      title={title}
      color={color}
      image={image}
      onClick={onClick}
    >
      {children}
    </StyledDisc>
  )
}

export default Disc
