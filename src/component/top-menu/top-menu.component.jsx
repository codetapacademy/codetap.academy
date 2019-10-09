import React, { useEffect, useState } from 'react'
import { StyledTopMenu, StyledLink, StyledButton, StyledLogoWrapper } from './top-menu.style'
import { WebInfoState } from '../web-info/web-info.context'
import { auth, GitHubProvider, db } from '../data/firebase'
import Avatar from '../avatar'
import Logo from '../_dumb/logo/logo.component'
import { navigate } from '@reach/router'
import Button from '../_dumb/button/button.component'
import ButtonGroup from '../_dumb/button-group/button-group.component'

const TopMenu = () => {
  const { user, updateUser } = WebInfoState()
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)

  useEffect(() => {
    if (user && userIsLoggedIn) {
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

  const handleLogInAndOut = () => {
    if (user) {
      setUserIsLoggedIn(false)
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
              setUserIsLoggedIn(true)
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
        <ButtonGroup>
          <Button
            onClick={() => navigate('/dashboard')}
            label="Dashboard"
            marginLeft="1rem"
            color="ok"
          />
          <Button
            onClick={() => navigate('/manage/user')}
            label="Manage user"
            marginLeft="1rem"
            color="ok"
          />
        </ButtonGroup>
      )}
      <Button
        onClick={() => window.open('https://discord.gg/xcmtRYV')}
        label="Chat"
        marginLeft="1rem"
        color="warning"
      />
      <Button
        onClick={() => navigate('/subscribe')}
        label="Subscribe"
        marginLeft="1rem"
        color="danger"
      />
      <Button
        onClick={handleLogInAndOut}
        label={getLogInOutLabel()}
        marginLeft="1rem"
        color="primary"
      />
      <Avatar showUser={false} user={user} />
    </StyledTopMenu>
  );
};

export default TopMenu;
