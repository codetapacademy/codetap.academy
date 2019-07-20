import React from 'react'
import { StyledCourseItem, StyledButtonWrapper, StyledTitle, StyledDescription } from './course-item.style'

const CourseItem = ({ id, title, description, deleteItem, handleCourseToEdit, goToCourse }) => {
  const handleDeleteItem = () => {
    deleteItem && deleteItem(id)
  }

  const handleEditItem = () => {
    handleCourseToEdit(id)
  }

  const handleGoToCourse = () => {
    goToCourse(id)
  }

  return (
    <StyledCourseItem>
      <StyledTitle onClick={handleGoToCourse}>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      <StyledButtonWrapper>
        <button onClick={handleEditItem}>💾</button>
        <button onClick={handleDeleteItem}>&times;</button>
      </StyledButtonWrapper>
    </StyledCourseItem>
  )
}

export default CourseItem
