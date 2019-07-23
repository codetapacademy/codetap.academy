import { useEffect } from 'react'
import {
  addCourseAction,
  removeCourseAction,
  modifyCourseAction,
  initCourseListAction,
} from '../course-panel/course-panel.action'
import { db } from '../data/firebase'
import { WebInfoState } from '../web-info/web-info.context';
import { addSectionAction, removeSectionAction, modifySectionAction } from '../course/section.action';

const WebData = () => {
  const { updateCourseList, updateSectionList } = WebInfoState()

  useEffect(() => {
    // I want to get a list of courses from FireStore
    const courseCollection = db
      .collection('course')
    const sectionCollection = db
      .collection('section')


    courseCollection.get().then((snapList => {
      const courseList = snapList.docs.map(d => {
        return {
          id: d.id,
          ...d.data()
        }
      })

      updateCourseList(initCourseListAction(courseList))
    }))
    const unsubscribeCourse = courseCollection
      .onSnapshot(snapList => {
        snapList.docChanges().forEach(change => {
          const course = change.doc.data()

          if (change.type === 'added' && change.doc.metadata.hasPendingWrites) {
            updateCourseList(addCourseAction({
              title: course.title,
              description: course.description,
              id: change.doc.id,
            }))
          }
          else if (change.type === 'removed') {
            updateCourseList(removeCourseAction({
              id: change.doc.id,
            }))
          }
          else if (change.type === 'modified') {
            updateCourseList(modifyCourseAction({
              title: course.title,
              description: course.description,
              id: change.doc.id,
            }))
            // setCourseIdToEdit(null)
          }
        })
      })
    const unsubscribeSection = sectionCollection
      .onSnapshot(snapList => {
        // const courseList = snapList.docs.map(d => {
        //   return {
        //     id: d.id,
        //     ...d.data()
        //   }
        // })

        // dispatch(initCourseListAction(courseList))

        snapList.docChanges().forEach(change => {
          const section = change.doc.data()
          if (change.type === 'added') {
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
    return () => {
      unsubscribeCourse()
      unsubscribeSection()
    }
  }, [])

  return null
}

export default WebData
