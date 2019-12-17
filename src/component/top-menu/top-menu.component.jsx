import React, { useEffect, useState } from 'react'
import { StyledTopMenu, StyledDropDownMenu } from './top-menu.style'
import { WebInfoState } from '../web-info/web-info.context'
import { auth, GitHubProvider, db } from '../data/firebase'
import { navigate } from '@reach/router'
import Button from '../_dumb/button'
// import ButtonGroup from '../_dumb/button-group'
import Disc from '../_dumb/disc'
import HeaderTitle from '../_dumb/header-title/header-title.component'

const TopMenu = () => {
  const { user, updateUser } = WebInfoState()
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)
  const [showDropDownMenu, setShowDropDownMenu] = useState(false)

  useEffect(() => {
    if (user && userIsLoggedIn) {
      db.collection('user')
        .doc(user.uid)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          const data = doc.data()
          const isAdmin = (data && data.isAdmin) || false
          console.log(data)
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
              const { accepted = false, firstName, lastName } = data || {}
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
                  firstName,
                  lastName,
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
  const goHome = () => {
    navigate('/')
    console.log('go home');

  }

  const toggleDropDownMenu = () => {
    console.log('toggleDropDownMenu', showDropDownMenu)
    setShowDropDownMenu(!showDropDownMenu)
  }

  return (
    <StyledTopMenu>
      <Disc title="CodeTap" color="danger" onClick={goHome}>
        <div className="codetap-academy-codetap">
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
          <span className="path4" />
        </div>
      </Disc>
      <HeaderTitle
        tag="h1"
        title="CodeTap Academy - the Web Developer Factory"
        text="CodeTap Academy - the Web Developer Factory"
        link="/"
      />
      <Button
        onClick={() => window.open('https://discord.gg/xcmtRYV')}
        label="Chat"
        color="warning"
        icon="chat"
      />
      <Button
        onClick={() => navigate('/subscribe')}
        label="Subscribe"
        color="danger"
        icon="subscribe"
      />
      {!user && <Button
        onClick={handleLogInAndOut}
        label={getLogInOutLabel()}
        color="primary"
        icon={getLogInOutLabel().toLowerCase()}
      />}

      {user && (
        <>
          <Disc
            image={user.photoURL}
            title={`${user.displayName} (${user.plan_id})`}
            onClick={toggleDropDownMenu}
          />
          {showDropDownMenu && (
            <StyledDropDownMenu>
              <div>
                {`${user.displayName} (${user.plan_id})`}
              </div>
              {user && user.isAdmin && (
                <>
                  <Button
                    onClick={() => navigate('/dashboard')}
                    label="Dashboard"
                    color="ok"
                    icon="dashboard"
                  />
                  <Button
                    onClick={() => navigate('/manage/user')}
                    label="Manage user"
                    color="ok"
                    icon="users"
                  />
                </>
              )}
              <Button
                onClick={() => navigate('/manage/profile')}
                label="profile"
                color="primary"
              />
              <Button
                onClick={handleLogInAndOut}
                label={getLogInOutLabel()}
                color="primary"
                icon={getLogInOutLabel().toLowerCase()}
              />
            </StyledDropDownMenu>
          )}
        </>
      )}
    </StyledTopMenu>
  );
};

export default TopMenu;
