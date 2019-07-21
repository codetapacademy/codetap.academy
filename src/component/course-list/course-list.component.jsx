import React from 'react'
import CourseItem from '../course-item/course-item.component';
import { StyledCourseList } from './course-list.style';


const CourseList = ({ courseList = [], deleteItem, handleUpdate, goToCourse }) => {
  const courseItemPropList = {...course, deleteItem, handleUpdate, goToCourse }

  renderCourseList = courseList
    .map(course =>
      <CourseItem
        key={course.id}
        {...courseItemPropList}
      />
    )

  return (
    <StyledCourseList>
      {renderCourseList()}
    </StyledCourseList>
  )
}

export default CourseList
