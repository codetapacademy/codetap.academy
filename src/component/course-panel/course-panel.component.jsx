import React, { useEffect, useReducer, useState } from 'react'
import { db } from '../data/firebase'
import CourseList from '../course-list/course-list.component'
import CourseEdit from '../course-edit/course-edit.component'
import { courseListReducer } from './course-panel.reducer'
import { addCourseAction, removeCourseAction, modifyCourseAction } from './course-panel.action'

const CoursePanel = () => {
  const [ courseTitle, setCourseTitle ] = useState('')
  const [ courseList, dispatch ] = useReducer(courseListReducer, [])
  const [ courseIdToEdit, setCourseIdToEdit ] = useState(null)
  const [ editInputUpdated, setEditInputUpdated ] = useState(false)

  useEffect(() => {
    // I want to get a list of courses from FireStore
    db
      .collection('course')
      .onSnapshot(snapList => {
        snapList.docChanges().forEach(change => {
          const title = change.doc.data()
          // console.log(title, change.type, change.doc.id)
          if (change.type === 'added') {
            dispatch(addCourseAction({
              title: title.courseTitle,
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
              title: title.courseTitle,
              id: change.doc.id,
            }))
            setCourseIdToEdit(null)
          }
        })
      })
  }, [])

  const deleteItem = id => {
    db
      .collection('course')
      .doc(id)
      // TODO, mark as deleted and never delete
      // some other logic should display data only if not marked as deleted
      .delete()
      .then(aaa => {
        // console.log(`Item with id: ${id} is no longer with us`, aaa)
      })
      .catch(message => console.log(`Weird message!`, message))
  }

  const addCourse = () => {
    const courseCollection = db.collection('course')
    if (courseIdToEdit) {
      // it means we want to update a course
      courseCollection.doc(courseIdToEdit).set(
        { courseTitle },
        { merge: true }
      )
    }
    else {
      // we want to add a course
      courseCollection.add({ courseTitle })
    }
    setCourseTitle('')
  }

  const getTheCourseTitle = (courseList, courseToEdit) => {
    setEditInputUpdated(false)
    return courseList
      .filter(({ id }) => id === courseToEdit)
      .map(({ title }) => title)[0] || ''
  }

  const courseEditValue = editInputUpdated
    // get the course title value from the list
    ? getTheCourseTitle(courseList, courseIdToEdit)
    // the value from the input or empty string
    : courseTitle

  const handleCourseToEdit = courseId => {
    setEditInputUpdated(true)
    setCourseIdToEdit(courseId)
    setCourseTitle(getTheCourseTitle(courseList, courseId))
  }

  const handleSetCourseTitle = e => {
    let value = ''
    if (e.target.value) {
      value = e.target.value
    }
    else {
      setCourseIdToEdit(null)
    }
    setCourseTitle(value)
  }

  return (
    <div>
      <CourseList
        courseList={courseList}
        handleCourseToEdit={handleCourseToEdit}
        deleteItem={deleteItem}
      />
      <CourseEdit
        addCourse={addCourse}
        handleSetCourseTitle={handleSetCourseTitle}
        courseIdToEdit={courseIdToEdit}
        courseTitle={courseEditValue}
      />
    </div>
  )
}

export default CoursePanel
