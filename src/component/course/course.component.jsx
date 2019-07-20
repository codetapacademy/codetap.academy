import React from 'react'
import { WebInfoState } from '../web-info/web-info.context';

const Course = ({ id }) => {
  const t = WebInfoState()
  return (
    <div>This is my course with id: {id}</div>
  )
}

export default Course
