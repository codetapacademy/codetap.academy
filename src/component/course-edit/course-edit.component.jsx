import React from 'react'
import { StyledActionButtonWrapper, StyledCourseEdit } from './course-edit.style';

const CourseEdit = ({ title, handleTitle, addCourse, courseIdToEdit, description, handleDescription }) => {
  return (
    <StyledCourseEdit>
      <input
        type="text"
        value={title}
        onChange={handleTitle}
        placeholder="Course title"/>

      <textarea
        value={description}
        onChange={handleDescription}
        placeholder="Course description"
      />

      <StyledActionButtonWrapper>
        <button onClick={addCourse}>
          {courseIdToEdit ? 'Save course' : 'Add course'}
        </button>
        {courseIdToEdit && <button onClick={handleTitle}>
          Cancel
        </button>}
      </StyledActionButtonWrapper>
    </StyledCourseEdit>
  )
}

export default CourseEdit
