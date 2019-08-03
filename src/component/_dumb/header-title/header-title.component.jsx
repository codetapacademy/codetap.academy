import React from 'react'
import { DynamicStyledTitle } from './header-title.style';

const HeaderTitle = ({ text = 'Change Me', tag = 'h1', title = '' }) => {
  return <DynamicStyledTitle tag={tag} title={title}>{text}</DynamicStyledTitle>
}

export default HeaderTitle
