import React from 'react'
import { StyledCommentSection, StyledTextArea, StyledButton } from './comment-section.style'

const CommentSection = () => {
  return (
    <StyledCommentSection>
      <StyledTextArea placeholder='Leave your comment' type='text'/>
      <StyledButton>Add comment</StyledButton>
    </StyledCommentSection>
  )
}

export default CommentSection
