import React from 'react'
import { StyledSectionItem, StyledSectionButtonGroup } from './section-item.style';

const SectionItem = ({ title, id, handleUpdate, deleteItem, showAddLecture, setShowAddLectureId }) => {
  return (
    <StyledSectionItem>
      {title}

      <StyledSectionButtonGroup side="right" columns="3">
        <button
          onClick={() => setShowAddLectureId(id)}
        >
          Add Lecture
        </button>

        <button
          onClick={() => handleUpdate(id)}
        >
          Edit
        </button>

        <button
          onClick={() => deleteItem(id)}
        >
          Delete
        </button>
      </StyledSectionButtonGroup>
    </StyledSectionItem>
  )
}

export default SectionItem
