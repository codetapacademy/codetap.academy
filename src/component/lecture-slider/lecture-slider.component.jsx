import React from 'react'

const LectureSlider = ({ lectureList, courseId }) => {
  return (
    <div>
      {lectureList.map(({ title, id }) => <div key={id}>{title}</div>)}
    </div>
  )
}

export default LectureSlider
