import React from 'react'
import CoursePanel from '../course-panel'
import TopMenu from '../top-menu'
import { Router } from '@reach/router'
import Home from '../home';
import Course from '../course';

const WebInfo = () => {
  return (
    <div>
      <TopMenu />
      <Router>
        <Home path="/" />
        <CoursePanel path="dashboard" />
        <Course path="/course/:id" />
      </Router>
    </div>
  )
}

export default WebInfo
