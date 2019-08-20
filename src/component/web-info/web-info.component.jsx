import React from 'react';
import Dashboard from '../dashboard';
import Home from '../home';
import Course from '../course';
import { StyledWebInfo, StyledRouter } from './web-info.style';
import Lecture from '../lecture';
import PlayVideo from '../play-video';
import ManageUser from '../manage-user';

const WebInfo = () => {
  return (
    <>
      <StyledWebInfo>
        <StyledRouter>
          <Home path="/" />
          <Dashboard path="dashboard" />
          <Course path="/course/:courseId" />
          <Lecture path="/lecture/:lectureId" />
          <PlayVideo path="/video/:youtubeVideoId" />
          <ManageUser path="/user/:userId" />
        </StyledRouter>
      </StyledWebInfo>
    </>
  );
};

export default WebInfo;
