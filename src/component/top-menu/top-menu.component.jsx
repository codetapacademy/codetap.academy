import React from 'react'
import { StyledTopMenu, StyledLink, StyledButton } from './top-menu.style'
import { WebInfoState } from '../web-info/web-info.context';

const TopMenu = () => {
  const { toggleChat, updateToggleChat } = WebInfoState()

  const handleToggleChat = () => {
    updateToggleChat({ type: 'TOGGLE_CHAT' });
  }

  return (
    <StyledTopMenu>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/dashboard">Dashboard</StyledLink>
      <button>Log in</button>
      <StyledButton onClick={handleToggleChat}>Invizi Chat</StyledButton>
    </StyledTopMenu>
  )
}

export default TopMenu
