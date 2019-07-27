import React, { useState } from 'react'
import { StyledSectionList, StyledSectionItem } from './section-list.style';
import { db } from '../data/firebase'
import SectionItem from '../section-item';
import LecturePanel from '../lecture-panel';

const SectionList = ({ data = [], handleUpdate, course = {} }) => {
  const [ showAddLectureId, setShowAddLectureId ] = useState('nimic')

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

  const renderLectureList = lectureList => {
    return lectureList.map(({ id, title, description }) => {
      return (
        <div key={id}>{title}</div>
      )
    })
  }

  return (
    <StyledSectionList>
      {data.map(({ title, description, id, lectureList }) => {
        const section = {
          title,
          description,
          id,
        }

        const sectionItemPropList = {
          ...section,
          showAddLectureId,
          setShowAddLectureId,
          deleteItem,
          handleUpdate
        }

        const lecturePanelPropList = {
          section,
          course,
          showAddLectureId,
          setShowAddLectureId,
        }
        return (
          <StyledSectionItem key={id}>
            <SectionItem {...sectionItemPropList} />
            {id === showAddLectureId && <LecturePanel {...lecturePanelPropList} />}
            {renderLectureList(lectureList)}
          </StyledSectionItem>
        )
      })}
    </StyledSectionList>
  )
}

export default SectionList
