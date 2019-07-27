import React from 'react'
import { StyledTopMenu, StyledLink, StyledButton } from './top-menu.style'
import { WebInfoState } from '../web-info/web-info.context';
import { auth, GitHubProvider, db } from '../data/firebase';
import Avatar from '../avatar';

const TopMenu = () => {
  const { toggleChat, updateToggleChat, user, updateUser } = WebInfoState()

  const handleToggleChat = () => {
    updateToggleChat({ type: 'TOGGLE_CHAT' });
  }

  const handleLogInAndOut = () => {
    if (user) {
      auth.signOut();
      updateUser({
        type: 'USER_AUTHENTICATE',
        user: null
      })
    }
    else {
      auth
        .signInWithPopup(GitHubProvider)
        .then(({ user: { uid, displayName, photoURL, email }}) => {
          db.collection('user').doc(uid).set({ displayName, photoURL, email }, { merge: true })
          updateUser({
            type: 'USER_AUTHENTICATE',
            user: {
              uid,
              displayName,
              photoURL
            }
          })
        })
        .catch(error => {
          // console.error(error)
        })
    }
  }

  const getLogInOutLabel = () => user ? 'Ba Bye' : 'Let me in!'

  return (
    <StyledTopMenu>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/dashboard">Dashboard</StyledLink>
      <Avatar user={user} />
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
