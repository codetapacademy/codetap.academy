import React, { useRef, useEffect, useState } from 'react';
import HeaderTitle from '../_dumb/header-title';
import ResponsiveThumbnail from '../_dumb/responsive-thumbnail';
import { StyledLectureInfo } from './lecture-info.style';

const LectureInfo = ({ title, id, description, imagePath, youtubeVideoId, sectionOrder, pageY }) => {
  const [newImagePath, setNewImagePath] = useState('')
  const getYoutubePath = () => `/video/${youtubeVideoId}`;

  const headerTitlePropList = {
    text: title,
    tag: 'a',
    fontSize: '13px',
    link: getYoutubePath()
  };

  const element = useRef()

  useEffect(() => {
    // console.log(pageY)
    if (pageY + window.innerHeight - element.current.getBoundingClientRect().top > 0 && !imagePath) {
      setNewImagePath(imagePath ? imagePath : `http://img.youtube.com/vi/${youtubeVideoId}/0.jpg`)
    }
  }, [pageY])

  return (
    <StyledLectureInfo sectionOrder={sectionOrder} ref={element}>
      <div>
        <ResponsiveThumbnail imagePath={newImagePath} />
      </div>
      <HeaderTitle {...headerTitlePropList} />
    </StyledLectureInfo>
  );
};

export default LectureInfo;
