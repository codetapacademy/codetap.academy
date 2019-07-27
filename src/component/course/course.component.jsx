import React, { useEffect, useState } from 'react'
import { db } from '../data/firebase'
import { WebInfoState } from '../web-info/web-info.context';
import PanelTitle from '../panel-title';
import SectionPanel from '../section-panel/section-panel.component';

const Course = ({ courseId }) => {
  const { courseList } = WebInfoState()
  const [ lectureBySectionIdList, setLectureBySectioIdList ] = useState({})
  const [ course, setCourse ] = useState({})

  useEffect(() => {
    console.log('useEffect')
    // get the course title and descripton
    const course = courseList.filter(({ id }) => id === courseId)[0]
    if (course && courseList.length) {
      setCourse(course)
    }

    // get a list of lectures filtered by the id of the course
    // and then filter the lectures by the section id in an object
    // that has the id of the section as a key and the value of it
    // as the lecture (title, desciption and id)
    db
      .collection('lecture')
      .where('course.id', '==', courseId)
      .get()
      .then(snapList => {
        const objectList = {}
        snapList.docs.forEach(doc => {
          const lectureId = doc.id;
          const lectureContent = doc.data()
          if (objectList.hasOwnProperty(lectureContent.section.id)) {
            objectList[lectureContent.section.id] = [...objectList[lectureContent.section.id], {
              id: lectureId,
              ...lectureContent
            }]
          }
          else {
            objectList[lectureContent.section.id] = [{
              id: lectureId,
              ...lectureContent
            }]
          }
        })

        console.log('setLectureBySectioIdList')
        setLectureBySectioIdList(objectList)
      })
    // return lectureUnsubscribe()
  }, [courseList])

  return (
    <div>
      <PanelTitle>{course.title}</PanelTitle>
      {console.log(courseList)}
      <p>{course.description}</p>
      {course && course.id && <SectionPanel course={course} />}
    </div>
  )
}

export default Course
