import React from 'react'
import { StyledCommentList } from './comment-list.style'

const CommentList = ({commentList}) => {
  console.log(commentList)
  return ( commentList === null ?
    '' :
    <StyledCommentList>
      {commentList.map((c,key) => 
          (<div key={key}>{c}</div>)
      )}
    </StyledCommentList>
  )
}

export default CommentList
