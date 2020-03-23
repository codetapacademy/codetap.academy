import React from 'react'
import { StyledLectureItem, StyledLink } from './lecture-item.style';
import Pill from '../_dumb/pill'

const LectureItem = ({ id, title, description, remove, sectionId, duration, levelRequired, published, ...rest }) => {
  const handleRemove = () => {
    remove(id, sectionId)
  }
  console.log(rest)
  return (
    <StyledLectureItem>
      <StyledLink to={`/manage/lecture/${id}`} title={description}>{title}</StyledLink>
      <Pill label="Level" value={levelRequired} />
      <Pill label="Published" value={published ? 'Yes' : 'No'} />
      <Pill label="Time" value={duration} />
      <button onClick={handleRemove}>&times;</button>
    </StyledLectureItem>
  )
}

export default LectureItem
