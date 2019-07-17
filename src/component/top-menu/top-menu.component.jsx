import React from 'react'
import { StyledTopMenu, StyledLink } from './top-menu.style'

const TopMenu = () => {
  return (
    <StyledTopMenu>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/dashboard">Dashboard</StyledLink>
      <button>Log in</button>
    </StyledTopMenu>
  )
}

export default TopMenu
