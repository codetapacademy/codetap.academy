import React from 'react'
import CoursePanel from '../course-panel'
import TopMenu from '../top-menu'
import Home from '../home';
import Course from '../course';
import { StyledWebInfo, StyledRouter } from './web-info.style';

const WebInfo = () => {
  return (
    <StyledWebInfo>
      <TopMenu />
      <StyledRouter>
        <Home path="/" />
        <CoursePanel path="dashboard" />
        <Course path="/course/:id" />
      </StyledRouter>
    </StyledWebInfo>
  )
}

export default WebInfo
