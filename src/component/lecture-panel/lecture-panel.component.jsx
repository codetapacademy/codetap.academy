import React, { useState } from 'react'
import ManageMeta from '../manage-meta'
import { StyledLecturePanel } from './lecture-panel.style';
import { db } from '../data/firebase'
import { addLectureToSectionAction } from '../course/section.action';
import { WebInfoState } from '../web-info/web-info.context';

const LecturePanel = ({ section = {}, course = {}, setShowAddLectureId, showAddLectureId }) => {
  const defaultLecture = {
    id: null,
    title: '',
    description: '',
    section,
    course,
  }

  const { updateSectionList } = WebInfoState();

  const [ lecture, setLecture ] = useState(defaultLecture)
  const label = 'Add lecture'
  const data = lecture
  const showCancel = true

  const save = async () => {
    const lectureCollection = db.collection('lecture')
    const { id, title, description } = lecture
    if (id) {
      // it means we want to update a lecture
      lectureCollection.doc(id).set(
        { title, description },
        { merge: true }
      )
    }
    else {
      // take out the id, as it sould be null
      const { id, ...restOfLecture } = lecture

      // we want to add a lecture
      const newLecture = await lectureCollection.add(restOfLecture)
      updateSectionList(
        addLectureToSectionAction({
          id: newLecture.id,
          ...restOfLecture
        })
      )
    }
    setLecture(defaultLecture)
  }
  const cancel = () => {
    setShowAddLectureId('')
  }
  const change = object => {
    setLecture({
      ...lecture,
      ...object,
    })
  }

  const lecturePropList = {
    label,
    save,
    change,
    cancel,
    data,
    showCancel
  }

  return (
    <StyledLecturePanel>
      <ManageMeta {...lecturePropList} />
    </StyledLecturePanel>
  )
}

export default LecturePanel
