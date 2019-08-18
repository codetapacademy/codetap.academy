import React from 'react';
import CoursePanel from '../course-panel';
import Home from '../home';
import Course from '../course';
import { StyledWebInfo, StyledRouter } from './web-info.style';
import Lecture from '../lecture';
import PlayVideo from '../play-video';

const WebInfo = () => {
  return (
    <>
      <StyledWebInfo>
        <StyledRouter>
          <Home path="/" />
          <CoursePanel path="dashboard" />
          <Course path="/course/:courseId" />
          <Lecture path="/lecture/:lectureId" />
          <PlayVideo path="/video/:youtubeVideoId" />
        </StyledRouter>
      </StyledWebInfo>
    </>
  );
};

export default WebInfo;
