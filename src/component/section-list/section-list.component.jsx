import React from 'react'
import { StyledSectionList } from './section-list.style';
import SectionItem from '../section-item';

const SectionList = ({ data = [] }) => {
  return (
    <StyledSectionList>
      {data.map(({ title }) => <SectionItem title={title} />)}
    </StyledSectionList>
  )
}

export default SectionList
