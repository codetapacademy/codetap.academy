import React, { useState, useEffect } from 'react'
import {
  StyledCommentSection,
  StyledTextArea,
  StyledButton,
} from './comment-section.style'
import CommentList from '../comment-list'
import { db, ts } from '../data/firebase'
import { WebInfoState } from '../web-info/web-info.context';

const CommentSection = ({ youtubeVideoId }) => {
  const [comment, setComment] = useState({})
  const [commentList, setCommentList] = useState([])
  const commentCollection = db.collection('comment')
  const { user } = WebInfoState()

  useEffect(() => {
    // get all comments once
    let unsubscribe
    (async () => {

      const commentSnap = await commentCollection
        .where('youtubeVideoId', '==', youtubeVideoId)
        .orderBy('ts', 'desc')
        .get()
      const commentList = commentSnap
        .docs
        .map(doc => doc.data())
      setCommentList(commentList)

      unsubscribe = commentCollection
        .where('youtubeVideoId', '==', youtubeVideoId)
        .orderBy('ts', 'desc')
        .onSnapshot(snapList => {
          // get new comments
          snapList.docChanges().forEach(change => {
            if (change.type == 'added' && change.doc.metadata.hasPendingWrites) {
              setCommentList([change.doc.data(), ...commentList])
            }
          })
        })
    })()
    return unsubscribe
  }, [])

  const handleOnChange = (e) => {
    const { value } = e.target
    setComment({
      value,
      user,
      ts,
      youtubeVideoId
    })
  }

  const handleOnClick = () => {
    // send comment to the database
    commentCollection
      .add(comment)
      .then(() => {
        // reset current comment if successful
        setComment({ value: '', user: null })
      })
      .catch(e => {
        console.log(e)
      })
    if (comment) {
    }
  }

  return (
    <div>
      <StyledCommentSection>
        <StyledTextArea
          placeholder='Leave your comment'
          type='text'
          value={comment.value}
          onChange={handleOnChange}
        />
        <StyledButton onClick={handleOnClick}>Add comment</StyledButton>
      </StyledCommentSection>
      <CommentList commentList={[...commentList]} />
    </div>
  )
}

export default CommentSection
