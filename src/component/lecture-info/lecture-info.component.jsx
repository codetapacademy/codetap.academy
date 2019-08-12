import React from 'react'
import HeaderTitle from '../_dumb/header-title';
import ResponsiveThumbnail from '../_dumb/responsive-thumbnail';
import { StyledLectureInfo } from './lecture-info.style'

const LectureInfo = ({ title, id, description, imagePath }) => {
  const headerTitlePropList = {
    text: title,
    tag: 'h4',
    fontSize: '13px',
  }

  return (
    <StyledLectureInfo>
      <div>
        <ResponsiveThumbnail imagePath={imagePath} />
      </div>
      <HeaderTitle {...headerTitlePropList} />
    </StyledLectureInfo>
  )
}

export default LectureInfo
