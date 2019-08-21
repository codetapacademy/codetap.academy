import React from 'react'
import { Link } from '@reach/router'
import { StyledLectureItem, StyledLink } from './lecture-item.style';

const LectureItem = ({ id, title, description, remove, sectionId }) => {
  const handleRemove = () => {
    remove(id, sectionId)
  }
  return (
    <StyledLectureItem>
      <button>☰</button>
      <StyledLink to={`/lecture/${id}`} title={description}>{title}</StyledLink>
      <button onClick={handleRemove}>&times;</button>
    </StyledLectureItem>
  )
}

export default LectureItem
