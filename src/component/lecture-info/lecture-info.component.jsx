import React from 'react'
import HeaderTitle from '../_dumb/header-title';

const LectureInfo = ({ title, id, description, imagePath }) => {
  return (
    <div>
      {/* <img src={imagePath} alt={title} width="208" height="117" /> */}
      <HeaderTitle
        text={title}
        level="4"
      />
    </div>
  )
}

export default LectureInfo
