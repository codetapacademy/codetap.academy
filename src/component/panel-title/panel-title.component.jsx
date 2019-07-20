import React from 'react'
import { StyledPanelTitle } from './panel-title.style';

const PanelTitle = ({ children }) => {
  return (
    <StyledPanelTitle>
      {children}
    </StyledPanelTitle>
  )
}

export default PanelTitle
