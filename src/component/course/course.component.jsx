import React, { useEffect, useState } from 'react'
import { db } from '../data/firebase'
import { WebInfoState } from '../web-info/web-info.context';
import PanelTitle from '../panel-title';
import SectionPanel from '../section-panel/section-panel.component';
import { addSectionAction, removeSectionAction, modifySectionAction, initSectionListAction } from '../course/section.action';

const Course = ({ courseId }) => {
  const { updateSectionList } = WebInfoState()
  const [ lectureBySectionIdList, setLectureBySectioIdList ] = useState({})
  const [ course, setCourse ] = useState({})

  useEffect(() => {
    let unsubscribe;
    (async () => {
      const lectureKeyList = {}
      // I want to get the course info
      const course = await db
        .collection('course')
        .doc(courseId)
        .get()

      setCourse({
        id: courseId,
        ...course.data()
      })

      // I want to get all the lectures based on the courseId
      try {
        const lectureSnapshotList = await db
          .collection('lecture')
          .where('course.id', '==', courseId)
          .get()
        lectureSnapshotList.docs.forEach(doc => {
          const lectureId = doc.id;
          const lectureContent = doc.data()
          if (lectureKeyList.hasOwnProperty(lectureContent.section.id)) {
            lectureKeyList[lectureContent.section.id] = [...lectureKeyList[lectureContent.section.id], {
              id: lectureId,
              ...lectureContent
            }]
          }
          else {
            lectureKeyList[lectureContent.section.id] = [{
              id: lectureId,
              ...lectureContent
            }]
          }
        })
      } catch (e) {
        console.error('Get lectureSnapshotList failed', e)
      }

      const sectionCollection = db
        .collection('section')
        .where('course.id', '==', courseId)

      const sectionSnapshotList = await sectionCollection.get()
      const sectionList = sectionSnapshotList.docs.map(d => {
        return {
          id: d.id,
          ...d.data(),
          lectureList: lectureKeyList[d.id] || [],
        }
      })

      unsubscribe = sectionCollection
        .onSnapshot(snapList => {
          snapList.docChanges().forEach(change => {
            const section = change.doc.data()
            if (change.type === 'added' && change.doc.metadata.hasPendingWrites) {
              updateSectionList(addSectionAction({
                title: section.title,
                description: section.description,
                id: change.doc.id,
              }))
            }
            else if (change.type === 'removed') {
              updateSectionList(removeSectionAction({
                id: change.doc.id,
              }))
            }
            else if (change.type === 'modified') {
              updateSectionList(modifySectionAction({
                title: section.title,
                description: section.description,
                id: change.doc.id,
              }))
              // setSectionIdToEdit(null)
            }
          })
        })

      updateSectionList(initSectionListAction(sectionList))
    })()
    return unsubscribe
  }, [])

  return (
    <div>
      <PanelTitle>{course.title}</PanelTitle>
      <p>{course.description}</p>
      {course && <SectionPanel course={course} />}
    </div>
  )
}

export default Course
