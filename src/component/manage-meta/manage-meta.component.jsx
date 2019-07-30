import React, { useRef, useEffect } from 'react'
import { StyledActionButtonWrapper, StyledManageMeta } from './manage-meta.style';

const ManageMeta = ({
  label,
  save,
  change,
  cancel,
  data,
  showCancel = false,
}) => {
  const titleInput = useRef()
  const { id = null, title = '', description = '' } = data

  useEffect(() => {
    if (!title.length) {
      titleInput.current.focus()
    }
  }, [title])

  return (
    <StyledManageMeta>
      <input
        type="text"
        ref={titleInput}
        value={title}
        onChange={e => change({ title: e.target.value })}
        autoFocus
        placeholder="Title"
      />

      <textarea
        value={description}
        onChange={e => change({ description: e.target.value })}
        placeholder="Description"
      />

      <StyledActionButtonWrapper>
        <button onClick={save}>{label}</button>
        {(id || showCancel) && <button onClick={cancel}>Cancel</button>}
      </StyledActionButtonWrapper>
    </StyledManageMeta>
  )
}

export default ManageMeta
