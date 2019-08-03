import React from 'react'
import { DynamicStyledTitle } from './header-title.style';

const HeaderTitle = ({ text = 'Change Me', tag = 'h1' }) => {
  return <DynamicStyledTitle tag={tag}>{text}</DynamicStyledTitle>
}

export default HeaderTitle
