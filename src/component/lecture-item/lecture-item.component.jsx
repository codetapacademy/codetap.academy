import React from 'react'
import { StyledLectureItem } from './lecture-item.style';

const LectureItem = ({ id, title, description, remove, sectionId }) => {
  const handleRemove = () => {
    remove(id, sectionId)
  }
  return (
    <StyledLectureItem>
      <button>☰</button>
      <span title={description}>{title}</span>
      <button onClick={handleRemove}>&times;</button>
    </StyledLectureItem>
  )
}

export default LectureItem
