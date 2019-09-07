import React from 'react';
import LectureInfo from '../lecture-info';
import { StyledLectureSlider } from './lecture-slider.style';

const LectureSlider = ({ lectureList, courseId, youtubePlaylistId, sectionList }) => {
  return (
    <StyledLectureSlider>
      {sectionList.map(section => {
        return (
          <div key={section.id}>
            <div>{section.title}</div>
            {
              lectureList
                .filter(lecture => lecture.section.id === section.id)
                .sort((a, b) => a.order - b.order)
                .map(({ id, ...lecture }) => <LectureInfo key={id} {...lecture} youtubePlaylistId={youtubePlaylistId} />)
            }
          </div>
        )
      })}
    </StyledLectureSlider>
  );
};

export default LectureSlider;
