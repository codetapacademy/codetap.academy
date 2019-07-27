import React, { useState } from 'react'
import ManageMeta from '../manage-meta'
import { StyledLecturePanel } from './lecture-panel.style';
import { db } from '../data/firebase'

const LecturePanel = ({ section = {}, course = {}, setShowAddLectureId, showAddLectureId }) => {
  const defaultLecture = {
    id: null,
    title: '',
    description: '',
    section,
    course,
  }

  const [ lecture, setLecture ] = useState(defaultLecture)
  const label = 'Add lecture'
  const data = lecture
  const showCancel = true

  const save = () => {
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
      const { id, ...restOfLecture } = lecture
      // we want to add a lecture
      lectureCollection.add(restOfLecture)
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
