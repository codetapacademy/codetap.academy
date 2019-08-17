import React from 'react'
import { StyledThumbnail } from './responsive-thumbail.style'

const ResponsiveThumbnail = ({ imagePath, ratio = '' }) => {
  if (!ratio || ratio === '16/9') {
    ratio = 9 / 16 * 100
  }
  return <StyledThumbnail ratio={ratio} imagePath={imagePath} />
}

export default ResponsiveThumbnail
