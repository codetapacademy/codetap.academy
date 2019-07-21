import React, { useRef, useEffect } from 'react'
import { StyledActionButtonWrapper, StyledManageTitleAndDescription } from './manage-title-and-description.style';

const ManageTitleAndDescription = ({ addLabel, saveLabel, title, handleTitle, addToDb, courseIdToEdit, description, handleDescription, handleCancel }) => {
  const titleInput = useRef()

  useEffect(() => {
    if (!title.length) {
      titleInput.current.focus()
    }
  }, [title])

  return (
    <StyledManageTitleAndDescription>
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
        <button onClick={addToDb}>
          {courseIdToEdit ? saveLabel : addLabel}
        </button>
        {courseIdToEdit && <button onClick={handleCancel}>
          Cancel
        </button>}
      </StyledActionButtonWrapper>
    </StyledManageTitleAndDescription>
  )
}

export default ManageTitleAndDescription
