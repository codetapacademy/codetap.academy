import React, { Fragment } from 'react';
import LectureInfo from '../lecture-info';
import { StyledLectureSlider } from './lecture-slider.style';

const LectureSlider = ({ lectureList, courseId, youtubePlaylistId, sectionList, pageY }) => {
  return (
    <StyledLectureSlider>
      {sectionList.map(section => {
        return (
          <Fragment key={section.id}>
            {
              lectureList
                .filter(lecture => lecture.section.id === section.id)
                .sort((a, b) => a.order - b.order)
                .map(({ id, ...lecture }) => (
                  <LectureInfo
                    key={id}
                    {...lecture}
                    pageY={pageY}
                    sectionOrder={section.order}
                    youtubePlaylistId={youtubePlaylistId}
                  />
                ))
            }
          </Fragment>
        )
      })}
    </StyledLectureSlider>
  );
};

export default LectureSlider;
