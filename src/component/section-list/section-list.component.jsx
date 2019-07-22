import React from 'react'
import { StyledSectionList, StyledSectionItem } from './section-list.style';
import { db } from '../data/firebase'
import SectionItem from '../section-item';

const SectionList = ({ data = [], handleUpdate }) => {

  const deleteItem = id => {
    db
      .collection('section')
      .doc(id)
      // TODO, mark as deleted and never delete
      // some other logic should display data only if not marked as deleted
      .delete()
      .then(aaa => {
        // console.log(`Item with id: ${id} is no longer with us`, aaa)
      })
      .catch(message => console.log(`Weird message!`, message))
  }

  return (
    <StyledSectionList>
      {data.map(({ title, description, id }) => {
        const sectionItemPropList = {
          title,
          description,
          id,
          deleteItem,
          handleUpdate
        }
        return (
          <StyledSectionItem key={id}>
            <SectionItem {...sectionItemPropList} />
          </StyledSectionItem>
        )
      })}
    </StyledSectionList>
  )
}

export default SectionList
