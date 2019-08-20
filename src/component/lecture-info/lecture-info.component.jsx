import React from 'react';
import HeaderTitle from '../_dumb/header-title';
import ResponsiveThumbnail from '../_dumb/responsive-thumbnail';
import { StyledLectureInfo } from './lecture-info.style';

const LectureInfo = ({ title, id, description, imagePath, youtubeVideoId, youtubePlaylistId }) => {
  const getImagePath = () =>
    imagePath ? imagePath : `http://img.youtube.com/vi/${youtubeVideoId}/0.jpg`;
  const getYoutubePath = () => `/video/${youtubeVideoId}`;

  // TODO: use this later on when linking to youtube
  // `https://www.youtube.com/watch?v=${youtubeVideoId}&list=${youtubePlaylistId}&t=0s`;

  const headerTitlePropList = {
    text: title,
    tag: 'a',
    fontSize: '13px',
    link: getYoutubePath()
  };

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
