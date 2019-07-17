import React from 'react'
import CoursePanel from '../course-panel';
import CourseList from '../course-list';

const WebInfo = () => {
  return (
    <div>
      <h1>Info about course released, mentoring and much more</h1>
      <CourseList />
      <CoursePanel />
    </div>
  )
}

export default WebInfo
