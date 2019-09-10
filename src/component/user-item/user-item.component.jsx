import React from 'react'
import Avatar from '../avatar'

const UserItem = ({ user }) => {
  const { displayName, photoUrl, email, id } = user
  return (
    <>
      <Avatar user={user} />
      <div>{email}</div>
      <div id={id}><a href={`#${id}`} title={id}>#{id.slice(0, 6)}</a></div>
    </>
  )
}

export default UserItem
