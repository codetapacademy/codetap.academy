import React from 'react'
import { StyledCourseItem, StyledButtonWrapper, StyledTitle, StyledDescription } from './course-item.style'

const CourseItem = ({ id, title, order, description, goToCourse }) => {
  const handleGoToCourse = () =>  goToCourse(id)

  return (
    <StyledCourseItem>
      <StyledTitle onClick={handleGoToCourse}>{title}</StyledTitle>
      <StyledDescription>
        {description}
      </StyledDescription>
    </StyledCourseItem>
  )
}

export default CourseItem
