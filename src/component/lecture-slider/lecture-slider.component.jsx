import React from 'react'
import LectureInfo from '../lecture-info';

const LectureSlider = ({ lectureList, courseId }) => {
  return (
    <div>
      {lectureList.map(({ id, ...lecture }) => <LectureInfo key={id} {...lecture} />)}
    </div>
  )
}

export default LectureSlider
