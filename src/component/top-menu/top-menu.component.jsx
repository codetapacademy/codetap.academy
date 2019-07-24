import React, { useState } from 'react'
import { StyledTopMenu, StyledLink, StyledButton } from './top-menu.style'
import { WebInfoState } from '../web-info/web-info.context';
import { auth, GitHubProvider } from '../data/firebase';

const TopMenu = () => {
  const { toggleChat, updateToggleChat } = WebInfoState()
  const [ loggedIn, setLoggedIn ] = useState(false) 

  const handleToggleChat = () => {
    updateToggleChat({ type: 'TOGGLE_CHAT' });
  }

  const handleLogInAndOut = () => {
    if (loggedIn) {
      auth.signOut();
    }
    else {
      auth
        .signInWithPopup(GitHubProvider)
        .then(user => {
          // console.log(user)
        })
        .catch(error => {
          // console.error(error)
        })
    }
  }

  const getLogInOutLabel = () => loggedIn ? 'Ba Bye' : 'Let me in!'

  return (
    <StyledTopMenu>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/dashboard">Dashboard</StyledLink>
      <button onClick={handleLogInAndOut}>
        {getLogInOutLabel()}
      </button>
      <StyledButton onClick={handleToggleChat}>{
        toggleChat ? 'Invizi Chat' : 'Gimme chat now!'
      }</StyledButton>
    </StyledTopMenu>
  )
}

export default TopMenu
