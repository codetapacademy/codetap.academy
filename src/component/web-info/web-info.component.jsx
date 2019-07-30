import React from 'react'
import CoursePanel from '../course-panel'
import TopMenu from '../top-menu'
import Home from '../home';
import Course from '../course';
import { StyledWebInfo, StyledRouter } from './web-info.style';
import Lecture from '../lecture';

const WebInfo = () => {
  return (
    <>
      <StyledWebInfo>
        <StyledRouter>
          <Home path="/" />
          <CoursePanel path="dashboard" />
          <Course path="/course/:courseId" />
          <Lecture path="/lecture/:lectureId" />
        </StyledRouter>
        <TopMenu />
      </StyledWebInfo>
    </>
  )
}

export default WebInfo
