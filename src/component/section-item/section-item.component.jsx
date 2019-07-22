import React from 'react'
import { StyledSectionItem, StyledSectionButton } from './section-item.style';

const SectionItem = ({ title, id, handleUpdate, deleteItem }) => {
  return (
    <StyledSectionItem>
      <StyledSectionButton
        side="left"
        onClick={() => handleUpdate(id)}
      >
        Edit
      </StyledSectionButton>
      {title}
      <StyledSectionButton
        side="right"
        onClick={() => deleteItem(id)}
      >
        Delete
      </StyledSectionButton>
    </StyledSectionItem>
  )
}

export default SectionItem
