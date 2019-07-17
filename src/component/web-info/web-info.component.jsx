import React from 'react'
import CoursePanel from '../course-panel'
import TopMenu from '../top-menu'
import { Router } from '@reach/router'
import Home from '../home';

const WebInfo = () => {
  return (
    <div>
      <TopMenu />
      <Router>
        <Home path="/" />
        <CoursePanel path="dashboard" />
      </Router>
    </div>
  )
}

export default WebInfo
