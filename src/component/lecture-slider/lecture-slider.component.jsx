import React from 'react';
import LectureInfo from '../lecture-info';
import { StyledLectureSlider } from './lecture-slider.style';

const LectureSlider = ({ lectureList, courseId, youtubePlaylistId }) => {
  return (
    <StyledLectureSlider>
      {lectureList.map(({ id, ...lecture }) => (
        <LectureInfo key={id} {...lecture} youtubePlaylistId={youtubePlaylistId} />
      ))}
    </StyledLectureSlider>
  );
};

export default LectureSlider;
