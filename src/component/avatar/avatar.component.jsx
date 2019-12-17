import React from 'react'
import { StyledAvatarImage, StyledAvatar } from './avatar.style';

const Avatar = ({ user, showUser = true, showAvatar = true }) => {
  const { displayName = '', photoURL = '', plan_id = '' } = user || {}
  return (
    <StyledAvatar title={`${displayName} (${plan_id})` || ''}>
      {showAvatar && user && <StyledAvatarImage url={photoURL} />}
      {showUser && displayName}
      {showUser && plan_id && ` (${plan_id})`}
    </StyledAvatar>
  )
}

export default Avatar
