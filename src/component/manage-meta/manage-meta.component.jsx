import React, { useRef, useEffect } from 'react'
import { StyledActionButtonWrapper, StyledManageTitleAndDescription } from './manage-meta.style';

const ManageTitleAndDescription = ({
  label,
  save,
  change,
  cancel,
  data
}) => {
  const titleInput = useRef()
  const { id, title, description } = data

  useEffect(() => {
    if (!title.length) {
      titleInput.current.focus()
    }
  }, [title])

  return (
    <StyledManageTitleAndDescription>
      <input
        type="text"
        ref={titleInput}
        value={title}
        onChange={e => change({ title: e.target.value })}
        autoFocus
        placeholder="Course title"/>

      <textarea
        value={description}
        onChange={e => change({ description: e.target.value })}
        placeholder="Course description"
      />

      <StyledActionButtonWrapper>
        <button onClick={save}>{label}</button>
        {id && <button onClick={cancel}>Cancel</button>}
      </StyledActionButtonWrapper>
    </StyledManageTitleAndDescription>
  )
}

export default ManageTitleAndDescription
