import React from 'react'
import CoursePanel from '../course-panel'
import TopMenu from '../top-menu'
import Home from '../home';
import Course from '../course';
import { StyledWebInfo, StyledRouter } from './web-info.style';
import { WebInfoProvider } from './web-info.context';

const WebInfo = () => {
  return (
    <WebInfoProvider>
      <StyledWebInfo>
        <StyledRouter>
          <Home path="/" />
          <CoursePanel path="dashboard" />
          <Course path="/course/:id" />
        </StyledRouter>
        <TopMenu />
      </StyledWebInfo>
    </WebInfoProvider>
  )
}

export default WebInfo
