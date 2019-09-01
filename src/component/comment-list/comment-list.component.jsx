import React from 'react'
import { StyledCommentList, StyledComment } from './comment-list.style'
import Avatar from '../avatar'

const CommentList = ({ commentList }) => {
  // console.log(commentList)
  return (commentList === null ?
    '' :
    <StyledCommentList>
      {commentList.map(({ value, user }, key) => (
        <StyledComment key={key}>
          <Avatar user={user} showUser={false} />
          {value}
        </StyledComment>
      ))}
    </StyledCommentList>
  )
}

export default CommentList
