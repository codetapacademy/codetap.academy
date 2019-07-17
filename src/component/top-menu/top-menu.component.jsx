import React from 'react'
import { Link } from '@reach/router'

const TopMenu = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <button>Log in</button>
    </div>
  )
}

export default TopMenu
