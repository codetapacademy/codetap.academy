import React, { useState } from 'react'
import { WebInfoState } from '../web-info/web-info.context'
import { db } from '../data/firebase'

const QuickProfile = () => {
  const { user, updateUser } = WebInfoState()
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)

  if (user) {
    console.log(user.displayName)
    console.log(user)
  }

  const handleOnBlur = (se, element) => {
    const { value } = se.target
    db
      .collection('user')
      .doc(user.uid)
      .set({ [element]: value }, { merge: true })
  }

  return (
    <div>
      <h1>Quick profile</h1>
      <div>Display name: <b>{user && user.displayName}</b></div>
      <div>
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          defaultValue={user && user.firstName}
          onBlur={e => handleOnBlur(e, 'firstName')}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          defaultValue={user && user.lastName}
          onBlur={e => handleOnBlur(e, 'lastName')}
        />
      </div>
      <div>
        <label htmlFor="lastName">Discord User ID</label>
        <input
          type="text"
          id="discordUserId"
          name="discordUserId"
          defaultValue={user && user.discordUserId}
          onBlur={e => handleOnBlur(e, 'discordUserId')}
        />
      </div>
    </div>
  )
}

export { QuickProfile }
