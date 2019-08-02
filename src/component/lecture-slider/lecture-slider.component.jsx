import React from 'react'
import LectureInfo from '../lecture-info';
import { StyledLectureSlider } from './lecture-slider.style';

const LectureSlider = ({ lectureList, courseId }) => {
  return (
    <StyledLectureSlider>
      {lectureList.map(({ id, ...lecture }) => <LectureInfo key={id} {...lecture} />)}
    </StyledLectureSlider>
  )
}

export default LectureSlider
