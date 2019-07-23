import { useEffect } from 'react'
import {
  addCourseAction,
  removeCourseAction,
  modifyCourseAction,
  initCourseListAction,
} from '../course-panel/course-panel.action'
import { db } from '../data/firebase'
import { WebInfoState } from '../web-info/web-info.context';

const WebData = () => {
  const { updateCourseList } = WebInfoState()

  useEffect(() => {
    // I want to get a list of courses from FireStore
    const courseCollection = db
      .collection('course')

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
    return unsubscribeCourse
  }, [])

  return null
}

export default WebData
