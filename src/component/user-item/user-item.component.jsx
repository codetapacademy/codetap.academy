import React from 'react'
import Avatar from '../avatar'

const UserItem = ({ user }) => {
  const { displayName, photoUrl, email, id, subscription: {
    next_billing_at,
    plan_id
  } = {} } = user

  const getNiceDate = time => time ? new Date(next_billing_at * 1000).toDateString() : ''

  return (
    <>
      <Avatar user={user} />
      <div>{email}</div>
      <div>{plan_id}</div>
      <div>{plan_id}</div>
      <div>{getNiceDate(next_billing_at)}</div>
      <div id={id}><a href={`#${id}`} title={id}>#{id.slice(0, 6)}</a></div>
    </>
  )
}

export default UserItem
