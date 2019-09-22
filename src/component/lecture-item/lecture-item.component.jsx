import React from 'react'
import { StyledLectureItem, StyledLink } from './lecture-item.style';
import Pill from '../_dumb/pill'

const LectureItem = ({ id, title, description, remove, sectionId, duration }) => {
  const handleRemove = () => {
    remove(id, sectionId)
  }
  return (
    <StyledLectureItem>
      <StyledLink to={`/manage/lecture/${id}`} title={description}>{title}</StyledLink>
      <Pill label="Time" value={duration} />
      <button onClick={handleRemove}>&times;</button>
    </StyledLectureItem>
  )
}

export default LectureItem
