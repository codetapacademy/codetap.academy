import React from 'react';
import HeaderTitle from '../_dumb/header-title';
import ResponsiveThumbnail from '../_dumb/responsive-thumbnail';
import { StyledLectureInfo } from './lecture-info.style';

const LectureInfo = ({ title, id, description, imagePath, youtubeVideoId, sectionOrder }) => {
  const getImagePath = () =>
    imagePath ? imagePath : `http://img.youtube.com/vi/${youtubeVideoId}/0.jpg`;
  const getYoutubePath = () => `/video/${youtubeVideoId}`;

  const headerTitlePropList = {
    text: title,
    tag: 'a',
    fontSize: '13px',
    link: getYoutubePath()
  };

  return (
    <StyledLectureInfo sectionOrder={sectionOrder}>
      <div>
        <ResponsiveThumbnail imagePath={getImagePath()} />
      </div>
      <HeaderTitle {...headerTitlePropList} />
    </StyledLectureInfo>
  );
};

export default LectureInfo;
