import React, { useState } from 'react'
import { db } from '../data/firebase'

const CoursePanel = () => {
  const [ courseTitle, setCourseTitle ] = useState('')
  const addCourse = () => {
    db
      .collection('course')
      .add({ courseTitle })
  }
  return (
    <div>
      <input
        type="text"
        value={courseTitle}
        onChange={e => setCourseTitle(e.target.value)}
        placeholder="Course title"/>
      <button onClick={addCourse}>Add course</button>
    </div>
  )
}

export default CoursePanel
