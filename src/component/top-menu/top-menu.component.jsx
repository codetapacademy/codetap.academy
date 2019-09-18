import React from 'react';
import { StyledTopMenu, StyledLink, StyledButton, StyledLogoWrapper } from './top-menu.style';
import { WebInfoState } from '../web-info/web-info.context';
import { auth, GitHubProvider, db } from '../data/firebase';
import Avatar from '../avatar';
import Logo from '../_dumb/logo/logo.component';
import { navigate } from '@reach/router';

const TopMenu = () => {
  const { toggleChat, updateToggleChat, user, updateUser } = WebInfoState();

  const handleToggleChat = () => {
    updateToggleChat({ type: 'TOGGLE_CHAT' });
  };

  const handleLogInAndOut = () => {
    if (user) {
      auth.signOut();
      navigate('/');
      updateUser({
        type: 'USER_AUTHENTICATE',
        user: null
      });
    } else {
      auth
        .signInWithPopup(GitHubProvider)
        .then(data => {
          const { user: { uid, displayName, photoURL, email } } = data

          db.collection('user')
            .doc(uid)
            .get()
            .then(snap => {
              const data = snap.data()
              const isAdmin = (data && data.isAdmin) || false
              const { current_term_end, plan_id, customer_id } = (data && data.subscription) || {}
              db.collection('user')
                .doc(uid)
                .set({ displayName, photoURL, email }, { merge: true });
              navigate('/dashboard');
              updateUser({
                type: 'USER_AUTHENTICATE',
                user: {
                  uid,
                  displayName,
                  photoURL,
                  email,
                  plan_id,
                  current_term_end,
                  customer_id,
                  isAdmin
                }
              });
            })
        })
        .catch(error => {
          // console.error(error)
        });
    }
  };

  const getLogInOutLabel = () => (user ? 'Ba Bye' : 'Let me in!');

  return (
    <StyledTopMenu>
      <StyledLink to="/">
        <StyledLogoWrapper title="The Web Developer Factory - Super Boost Your Career from Zero to Hired">
          <Logo />
          <span>CodeTap Academy</span>
        </StyledLogoWrapper>
      </StyledLink>
      {user && user.isAdmin && (
        <>
          <StyledLink to="/dashboard">Dashboard</StyledLink>
          <StyledLink to="/manage-user">Manage user</StyledLink>
        </>
      )}
      {user && (
        <>
          <StyledLink to="/subscribe">Subscribe</StyledLink>
        </>
      )}
      <Avatar user={user} />
      <button onClick={handleLogInAndOut}>{getLogInOutLabel()}</button>
      <StyledButton onClick={handleToggleChat}>
        {toggleChat ? 'Invizi Chat' : 'Gimme chat now!'}
      </StyledButton>
    </StyledTopMenu>
  );
};

export default TopMenu;
