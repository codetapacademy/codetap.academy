import React from 'react'
import { StyledSectionItem, StyledSectionButton } from './section-item.style';

const SectionItem = ({ title, id, update, deleteItem }) => {
  return (
    <StyledSectionItem>
      <StyledSectionButton
        side="left"
        onClick={() => update(id)}
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
