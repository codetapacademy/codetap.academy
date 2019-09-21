import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import HeaderTitle from '../_dumb/header-title';
import ResponsiveThumbnail from '../_dumb/responsive-thumbnail';
import { StyledLectureInfo, StyledThumbnailWrapper, StyledThumbnail } from './lecture-info.style';

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps.newImagePath === nextProps.newImagePath;
}

const MemoStyledLectureInfo = memo(({ sectionOrder, element, newImagePath, headerTitlePropList }) => {
  return (
    <StyledLectureInfo sectionOrder={sectionOrder} ref={element}>
      <StyledThumbnailWrapper>
        <ResponsiveThumbnail />
        <StyledThumbnail src={newImagePath} alt="" width="100%" />
      </StyledThumbnailWrapper>
      <HeaderTitle {...headerTitlePropList} />
    </StyledLectureInfo>
  )
}, arePropsEqual)

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

  const updateNewImagePath = useCallback(() => {
    if (pageY + window.innerHeight - element.current.getBoundingClientRect().top > 0 && !newImagePath) {
      setNewImagePath(imagePath ? imagePath : `http://img.youtube.com/vi/${youtubeVideoId}/0.jpg`)
    }
  }, [newImagePath])

  useEffect(() => {
    updateNewImagePath()
  }, [pageY])

  return (
    <MemoStyledLectureInfo {...{ sectionOrder, element, newImagePath, headerTitlePropList }} />
  );
};

export default LectureInfo;
