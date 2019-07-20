import React, { useRef, useEffect } from 'react'
import { StyledActionButtonWrapper, StyledCourseEdit } from './course-edit.style';

const CourseEdit = ({ title, handleTitle, addCourse, courseIdToEdit, description, handleDescription, handleCancel }) => {
  const titleInput = useRef()

  useEffect(() => {
    if (!title.length) {
      titleInput.current.focus()
    }
  }, [title])

  return (
    <StyledCourseEdit>
      <input
        type="text"
        ref={titleInput}
        value={title}
        onChange={handleTitle}
        autoFocus
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
        {courseIdToEdit && <button onClick={handleCancel}>
          Cancel
        </button>}
      </StyledActionButtonWrapper>
    </StyledCourseEdit>
  )
}

export default CourseEdit
