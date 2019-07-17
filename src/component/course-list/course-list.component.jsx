import React from 'react'
import CourseItem from '../course-item/course-item.component';


const CourseList = ({ courseList = [], deleteItem, handleCourseToEdit }) => {
  return (
    <div>
      <h1>
        Course List
      </h1>
      {courseList.map(course => <CourseItem
        key={course.id}
        {...{...course, deleteItem, handleCourseToEdit }}
        />
      )}
    </div>
  )
}

export default CourseList
