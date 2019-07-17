import React from 'react'

const CourseEdit = ({ courseTitle, handleSetCourseTitle, addCourse, courseIdToEdit }) => {
  return (
    <div>
      <input
        type="text"
        value={courseTitle}
        onChange={handleSetCourseTitle}
        placeholder="Course title"/>
      <button onClick={addCourse}>
        {courseIdToEdit ? 'Save course' : 'Add course'}
      </button>
      {courseIdToEdit && <button onClick={handleSetCourseTitle}>
        Cancel
      </button>}
    </div>
  )
}

export default CourseEdit
