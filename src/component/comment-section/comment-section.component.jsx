import React, { useState } from 'react'
import {
  StyledCommentSection,
  StyledTextArea,
  StyledButton,
} from './comment-section.style'
import CommentList from '../comment-list'

const CommentSection = () => {
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState([])

  const handleOnChange = (e) => {
    setComment(e.target.value)
  }
  
  const handleOnClick = () => {
    setCommentList([...commentList, comment])
    setComment('')
  }
  
  return (
    <div>
      <StyledCommentSection>
        <StyledTextArea 
          placeholder='Leave your comment' 
          type='text' 
          value={comment}
          onChange={handleOnChange}
        />
        <StyledButton onClick={handleOnClick}>Add comment</StyledButton>
      </StyledCommentSection>
      <CommentList commentList={[...commentList]}/>
    </div>
  )
}

export default CommentSection
