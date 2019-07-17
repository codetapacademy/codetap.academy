import React from 'react'
import { StyledCourseItem } from './course-item.style';

const CourseItem = ({ id, title, deleteItem, editItem }) => {
  const handleDeleteItem = () => {
    deleteItem && deleteItem(id)
  }

  return (
    <StyledCourseItem>
      <div>{title}</div>
      <button onClick={editItem}>💾</button>
      <button onClick={handleDeleteItem}>&times;</button>
    </StyledCourseItem>
  )
}

export default CourseItem
