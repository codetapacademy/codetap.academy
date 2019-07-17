import React from 'react'
import { StyledCourseItem } from './course-item.style'

const CourseItem = ({ id, title, deleteItem, handleCourseToEdit }) => {
  const handleDeleteItem = () => {
    deleteItem && deleteItem(id)
  }

  const handleEditItem = () => {
    handleCourseToEdit(id)
  }

  return (
    <StyledCourseItem>
      <div>{title}</div>
      <button onClick={handleEditItem}>💾</button>
      <button onClick={handleDeleteItem}>&times;</button>
    </StyledCourseItem>
  )
}

export default CourseItem
