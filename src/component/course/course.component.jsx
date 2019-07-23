import React, { useEffect, useState } from 'react'
import { WebInfoState } from '../web-info/web-info.context';
import PanelTitle from '../panel-title';
import SectionPanel from '../section-panel/section-panel.component';

const Course = ({ courseId }) => {
  const { courseList } = WebInfoState()
  const [ course, setCourse ] = useState({})

  useEffect(() => {
    // sectionList
    //   .filter(Section => Section.id === SectionId)
    //   .forEach(({ title, description }) => {
    //     setDescription(description)
    //     setTitle(title)
    //   })
    const course = courseList.filter(({ id }) => id === courseId)[0]
    if (course && courseList.length) {
      setCourse(course)
    }
  }, [courseList])

  return (
    <div>
      <PanelTitle>{course.title}</PanelTitle>
      <p>{course.description}</p>
      {course && course.id && <SectionPanel course={course} />}
    </div>
  )
}

export default Course
