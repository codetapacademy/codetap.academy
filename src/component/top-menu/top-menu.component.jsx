import React, { useEffect } from 'react'
import { StyledTopMenu, StyledLink, StyledButton, StyledLogoWrapper } from './top-menu.style'
import { WebInfoState } from '../web-info/web-info.context'
import { auth, GitHubProvider, db } from '../data/firebase'
import Avatar from '../avatar'
import Logo from '../_dumb/logo/logo.component'
import { navigate } from '@reach/router'
import Button from '../_dumb/button/button.component'

const TopMenu = () => {
  const { user, updateUser } = WebInfoState()

  useEffect(() => {
    if (user) {
      db.collection('user')
        .doc(user.uid)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          const data = doc.data()
          const isAdmin = (data && data.isAdmin) || false
          const { accepted = false, displayName, photoURL, email } = data || {}
          const { current_term_end, next_billing_at, plan_id, customer_id } = (data && data.subscription) || {}
          updateUser({
            type: 'USER_AUTHENTICATE',
            user: {
              uid: user.uid,
              displayName,
              photoURL,
              email,
              plan_id,
              current_term_end,
              next_billing_at,
              customer_id,
              isAdmin,
              accepted
            }
          });
      })

    }

  }, [])

  const joinChat = () => navigate('https://discord.gg/xcmtRYV')

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
              const { accepted = false } = data || {}
              const { current_term_end, next_billing_at, plan_id, customer_id } = (data && data.subscription) || {}
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
                  next_billing_at,
                  customer_id,
                  isAdmin,
                  accepted
                }
              });
            })
        })
        .catch(error => {
          // console.error(error)
        });
    }
  };

  const getLogInOutLabel = () => (user ? 'Logout' : 'Login');

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
          <StyledLink to="/manage/user">Manage user</StyledLink>
        </>
      )}
      {user && (
        <>
          <StyledLink to="/subscribe">Subscribe</StyledLink>
        </>
      )}
      <Avatar user={user} />
      <Button
        onClick={joinChat}
        label="Chat"
        color="warning"
      />
      <Button
        onClick={handleLogInAndOut}
        label={getLogInOutLabel()}
        color="primary"
      />
    </StyledTopMenu>
  );
};

export default TopMenu;
