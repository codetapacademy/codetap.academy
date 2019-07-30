import React from 'react'
import { StyledCourseItem, StyledButtonWrapper, StyledTitle, StyledDescription } from './course-item.style'

const CourseItem = ({ id, title, description, deleteItem, handleUpdate, goToCourse }) => {
  const handleDeleteItem = () => deleteItem && deleteItem(id)
  const handleEditItem = () =>  handleUpdate(id)
  const handleGoToCourse = () =>  goToCourse(id)

  return (
    <StyledCourseItem>
      <StyledTitle onClick={handleGoToCourse}>{title}</StyledTitle>
      <StyledDescription>
        {description}
        <StyledButtonWrapper>
          <button onClick={handleEditItem}>✒️</button>
          <button onClick={handleDeleteItem}>&times;</button>
        </StyledButtonWrapper>
      </StyledDescription>
    </StyledCourseItem>
  )
}

export default CourseItem
