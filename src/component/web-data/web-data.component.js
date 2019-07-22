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
    const unsubscribeCourse = courseCollection
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
          console.log(course.title, change.type, change.doc.id)
          if (change.type === 'added') {
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
          console.log(section.title, change.type, change.doc.id)
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
