import React from 'react'
import CourseItem from '../course-item/course-item.component';
import { StyledCourseList } from './course-list.style';


const CourseList = ({ courseList = [], deleteItem, handleCourseToEdit }) => {
  return (
    <StyledCourseList>
      {courseList.map(course => <CourseItem
        key={course.id}
        {...{...course, deleteItem, handleCourseToEdit }}
        />
      )}
    </StyledCourseList>
  )
}

export default CourseList
