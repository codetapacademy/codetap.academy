import React from 'react'
import { StyledDisc } from './disc.style'

const Disc = ({ title, image, color, onClick }) => {
  return (
    <StyledDisc
      title={title}
      color={color}
      image={image}
      onClick={onClick}
    />
  )
}

export default Disc
