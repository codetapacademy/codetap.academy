import React from 'react'
import CourseItem from '../course-item/course-item.component';
import { StyledCourseList } from './course-list.style';


const CourseList = ({ courseList = [], deleteItem, handleUpdate, goToCourse }) => {
  const renderCourseList = () => courseList
    .map(course =>
      <CourseItem
        key={course.id}
        {...{ ...course, deleteItem, handleUpdate, goToCourse }}
      />
    )

  return (
    <StyledCourseList>
      {renderCourseList()}
    </StyledCourseList>
  )
}

export default CourseList
