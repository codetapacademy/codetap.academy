import React, { useEffect, useReducer } from 'react'
import { db } from '../data/firebase'

const ADD_COURSE = '[Course list] -> ADD_COURSE'
const addCourseAction = course => ({
  type: ADD_COURSE,
  course,
})

const courseListReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_COURSE:
      return [...state, { title: action.course.title, id: action.course.id }]
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
          console.log(title)
          if (change.type === 'added') {
            dispatch(addCourseAction({
              title: title.courseTitle,
              id: change.doc.id,
            }))
          }
        })
      })
  }, [])

  return (
    <div>
      <h1>
        Course List
      </h1>
      {courseList.map(({ title, id }) => <div key={id}>{title}</div>)}
    </div>
  )
}

export default CourseList
