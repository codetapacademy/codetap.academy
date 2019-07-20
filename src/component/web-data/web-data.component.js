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
  const { dispatch } = WebInfoState()

  useEffect(() => {
    // I want to get a list of courses from FireStore
    const courseCollection = db
      .collection('course')

    // TODO, create some sort of initialising only once
    // or check if an element exists by id, or whatever
    // works so you get the list once and on snapshot change
    // only adds the first ones if the list hasn't been initialised.
      // const courseList = snapList.docs.map(d => {
      //   return {
      //     id: d.id,
      //     ...d.data()
      //   }
      // })

      // dispatch(initCourseListAction(courseList))
    // courseCollection.get().then((snapList => {
    // }))
    const unsubscribe = courseCollection
      .onSnapshot(snapList => {
        // const courseList = snapList.docs.map(d => {
        //   return {
        //     id: d.id,
        //     ...d.data()
        //   }
        // })

        // dispatch(initCourseListAction(courseList))

        snapList.docChanges().forEach(change => {
          const course = change.doc.data()
          // console.log(title, change.type, change.doc.id)
          if (change.type === 'added') {
            dispatch(addCourseAction({
              title: course.title,
              description: course.description,
              id: change.doc.id,
            }))
          }
          else if (change.type === 'removed') {
            dispatch(removeCourseAction({
              id: change.doc.id,
            }))
          }
          else if (change.type === 'modified') {
            dispatch(modifyCourseAction({
              title: course.title,
              description: course.description,
              id: change.doc.id,
            }))
            // setCourseIdToEdit(null)
          }
        })
      })
    return unsubscribe
  }, [])

  return null
}

export default WebData
