import React from 'react'
import { StyledCourseItem, StyledButtonWrapper, StyledTitle, StyledDescription } from './course-item.style'

const CourseItem = ({ id, title, description, deleteItem, handleCourseToEdit }) => {
  const handleDeleteItem = () => {
    deleteItem && deleteItem(id)
  }

  const handleEditItem = () => {
    handleCourseToEdit(id)
  }

  return (
    <StyledCourseItem>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      <StyledButtonWrapper>
        <button onClick={handleEditItem}>💾</button>
        <button onClick={handleDeleteItem}>&times;</button>
      </StyledButtonWrapper>
    </StyledCourseItem>
  )
}

export default CourseItem
