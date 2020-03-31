import React, { useRef } from 'react'
import { StyledLectureItem, StyledLink, StyledHiddenTextarea, StyledCopyButton } from './lecture-item.style';
import Pill from '../_dumb/pill'

const LectureItem = ({ id, title, description, remove, sectionId, duration, levelRequired, published, ...rest }) => {
  const titleContent = useRef()
  const descriptionContent = useRef()

  const handleRemove = () => {
    remove(id, sectionId)
  }

  const copyText = e => {
    const { name } = e.target
    const copyReferenceHolder = {
      title: titleContent,
      description: descriptionContent
    }

    if (copyReferenceHolder.hasOwnProperty(name)) {
      copyReferenceHolder[name].current.select()
      document.execCommand('copy')
    }
  }

  return (
    <StyledLectureItem>
      <StyledLink to={`/manage/lecture/${id}`} title={description}>{title}</StyledLink>
      <StyledCopyButton name="title" onClick={copyText}>CT</StyledCopyButton>
      <StyledCopyButton name="description" onClick={copyText}>CD</StyledCopyButton>

      <StyledHiddenTextarea
        ref={titleContent}
        tabIndex="-1"
        defaultValue={title}
      />
      <StyledHiddenTextarea
        ref={descriptionContent}
        tabIndex="-1"
        defaultValue={description}
      />

      <Pill label="Level" value={levelRequired} />
      <Pill label="Published" value={published ? 'Yes' : 'No'} />
      <Pill label="Time" value={duration} />
      <button onClick={handleRemove}>&times;</button>
    </StyledLectureItem>
  )
}

export default LectureItem
