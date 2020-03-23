import React from 'react'
import { StyledSectionItem, StyledSectionButtonGroup } from './section-item.style';

const SectionItem = ({ title, id, handleUpdate, deleteItem, toggleSection, setShowAddLectureId }) => {
  return (
    <StyledSectionItem>
      {title}

      <StyledSectionButtonGroup side="right" columns="4">
        <button
          onClick={() => toggleSection(id)}
        >
          Toggle Section
        </button>

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
