import React from 'react'
import { StyledTopMenu, StyledLink, StyledButton } from './top-menu.style'

const TopMenu = () => {
  return (
    <StyledTopMenu>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/dashboard">Dashboard</StyledLink>
      <button>Log in</button>
      <StyledButton>Invizi Chat</StyledButton>
    </StyledTopMenu>
  )
}

export default TopMenu
