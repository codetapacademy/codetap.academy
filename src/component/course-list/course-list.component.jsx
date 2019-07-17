import React, { useEffect, useReducer } from 'react'
import { db } from '../data/firebase'
import CourseItem from '../app/course-item';

const ADD_COURSE = '[Course list] -> ADD_COURSE'
const REMOVE_COURSE = '[Course list] -> REMOVE_COURSE'
const addCourseAction = course => ({
  type: ADD_COURSE,
  course,
})

const removeCourseAction = course => ({
  type: REMOVE_COURSE,
  course,
})

const courseListReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_COURSE:
      return [...state, { title: action.course.title, id: action.course.id }]
    case REMOVE_COURSE:
      return state.filter(course => course.id !== action.course.id)
    default:
      return state
  }
}

const CourseList = () => {
  const [ courseList, dispatch ] = useReducer(courseListReducer, [])
  useEffect(() => {
    // I want to get a list of courses from FireStore
    db
      .collection('course')
      .onSnapshot(snapList => {
        snapList.docChanges().forEach(change => {
          const title = change.doc.data()
          console.log(title, change.type)
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
        })
      })
  }, [])

  const deleteItem = id => {
    console.log('deleteItem', id)
    db
      .collection('course')
      .doc(id)
      .delete()
      .then(aaa => {
        console.log(`Item with id: ${id} is no longer with us`)
      })
      .catch(message => console.log(`Weird message!`, message))
  }

  return (
    <div>
      <h1>
        Course List
      </h1>
      {courseList.map(course => <CourseItem key={course.id} {...{...course, deleteItem}} />)}
    </div>
  )
}

export default CourseList
