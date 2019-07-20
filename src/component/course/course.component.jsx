import React, { useEffect, useState } from 'react'
import { WebInfoState } from '../web-info/web-info.context';
import PanelTitle from '../panel-title';

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
      <PanelTitle>{title}</PanelTitle>
      <p>{description}</p>
    </div>
  )
}

export default Course
