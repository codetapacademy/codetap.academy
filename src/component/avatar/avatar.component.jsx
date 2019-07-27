import React from 'react'
import { StyledAvatarImage, StyledAvatar } from './avatar.style';

const Avatar = ({ user, showUser = true, showAvatar = true }) => {
  const { displayName = '', photoURL = '' } = user || {}
  return (
    <StyledAvatar>
      {showAvatar && user && <StyledAvatarImage url={photoURL} />}
      {showUser && displayName}
    </StyledAvatar>
  )
} 

export default Avatar
