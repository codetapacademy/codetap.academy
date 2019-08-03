import React from 'react'
import HeaderTitle from '../_dumb/header-title';
import ResponsiveThumbnail from '../_dumb/responsive-thumbnail';
import { StyledLectureInfo } from './lecture-info.style'

const LectureInfo = ({ title, id, description, imagePath }) => {
  return (
    <StyledLectureInfo>
      <div>
        <ResponsiveThumbnail imagePath={imagePath} />
      </div>
      <HeaderTitle
        text={title}
        tag="h4"
      />
    </StyledLectureInfo>
  )
}

export default LectureInfo
