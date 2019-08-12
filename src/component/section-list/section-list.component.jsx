import React, { useState } from 'react'
import { StyledSectionList, StyledSectionItem } from './section-list.style';
import { db, storage } from '../data/firebase'
import SectionItem from '../section-item';
import LecturePanel from '../lecture-panel';
import LectureItem from '../lecture-item/lecture-item.component';
import { removeLectureFromSectionAction } from '../course/section.action';
import { WebInfoState } from '../web-info/web-info.context';

const SectionList = ({ data = [], handleUpdate, course = {} }) => {
  const [showAddLectureId, setShowAddLectureId] = useState('nimic')
  const { updateSectionList } = WebInfoState()

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

  const deleteLectureItem = (id, sectionId) => {
    db
      .collection('lecture')
      .doc(id)
      .delete()
      .then(aaa => {
        // console.log(`Item with id: ${id} is no longer with us`, aaa)
        updateSectionList(removeLectureFromSectionAction(id, sectionId))
        // remove image if it exists
        const imageRef = storage
          .ref("lecture-picture")
          .child(id)
          .delete()
          .then(console.log)
          .catch(console.log)

      })
      .catch(message => console.log(`Weird message!`, message))
  }

  const renderLectureList = (lectureList, sectionId) => {
    return (lectureList || []).map(lecture => {
      return (
        <LectureItem key={lecture.id} {...lecture} sectionId={sectionId} remove={deleteLectureItem} />
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
            {renderLectureList(lectureList, id)}
          </StyledSectionItem>
        )
      })}
    </StyledSectionList>
  )
}

export default SectionList
