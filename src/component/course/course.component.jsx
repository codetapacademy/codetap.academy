import React, { useEffect, useState } from 'react'
import { WebInfoState } from '../web-info/web-info.context';

const Course = ({ id }) => {
  const { courseList } = WebInfoState()
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')

  useEffect(() => {
    courseList
      .filter(course => course.id === id)
      .forEach(({ title, description }) => {
        setDescription(description)
        setTitle(title)
      })
  }, [])

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default Course
