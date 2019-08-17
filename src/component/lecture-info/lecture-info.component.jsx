import React from 'react';
import HeaderTitle from '../_dumb/header-title';
import ResponsiveThumbnail from '../_dumb/responsive-thumbnail';
import { StyledLectureInfo } from './lecture-info.style';

const LectureInfo = ({ title, id, description, imagePath, youtubeVideoId }) => {
  console.log(youtubeVideoId, imagePath);
  // http://img.youtube.com/vi/A-iTEtt6SN8/0.jpg
  const headerTitlePropList = {
    text: title,
    tag: 'h4',
    fontSize: '13px'
  };

  const getImagePath = () =>
    imagePath ? imagePath : `http://img.youtube.com/vi/${youtubeVideoId}/0.jpg`;

  return (
    <StyledLectureInfo>
      <div>
        <ResponsiveThumbnail imagePath={getImagePath()} />
      </div>
      <HeaderTitle {...headerTitlePropList} />
    </StyledLectureInfo>
  );
};

export default LectureInfo;
