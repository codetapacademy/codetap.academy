import React from 'react'
import { StyledAvatarImage, StyledAvatar } from './avatar.style';

const Avatar = ({ user, showUser = true, showAvatar = true }) => {
  const { displayName = '', photoURL = '', plan_id = '' } = user || {}
  return (
    <StyledAvatar>
      {showAvatar && user && <StyledAvatarImage url={photoURL} />}
      {showUser && displayName}
      {plan_id && ` (${plan_id})`}
    </StyledAvatar>
  )
}

export default Avatar
