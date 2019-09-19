import React from 'react';
import Dashboard from '../dashboard';
import Home from '../home';
import Course from '../course';
import { StyledWebInfo, StyledRouter } from './web-info.style';
import Lecture from '../lecture';
import PlayVideo from '../play-video';
import ManageUser from '../manage-user';
import Subscribe from '../subscribe';
import HomeOld from '../home-old';

const WebInfo = () => {
  return (
    <>
      <StyledWebInfo>
        <StyledRouter>
          <Home path="/" />
          <HomeOld path="/home-old" />
          <Dashboard path="dashboard" />
          <Course path="/manage/course/:courseId" />
          <Lecture path="/manage/lecture/:lectureId" />
          <PlayVideo path="/video/:youtubeVideoId" />
          <ManageUser path="/manage/user" />
          <Subscribe path="/subscribe" />
        </StyledRouter>
      </StyledWebInfo>
    </>
  );
};

export default WebInfo;
