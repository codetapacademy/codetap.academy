import React, { useEffect, useState } from 'react'
import { db } from '../data/firebase'
import { WebInfoState } from '../web-info/web-info.context';
import PanelTitle from '../panel-title';
import SectionPanel from '../section-panel/section-panel.component';

const Course = ({ courseId }) => {
  // const { courseList } = WebInfoState()
  const [ lectureBySectionIdList, setLectureBySectioIdList ] = useState({})
  const [ course, setCourse ] = useState({})

  useEffect(() => {
    (async () => {
      // I want to get the course info
      const course = await db
        .collection('course')
        .doc(courseId)
        .get()
      
      console.log('useEffect', courseId, setCourse(course.data()))
      // I want to get all the lectures based on the courseId
      try {
        const lectureSnapshotList = await db
          .collection('lecture')
          .where('course.id', '==', courseId)
          .get()
        const lectureKeyList = {}
        lectureSnapshotList.docs.forEach(doc => {
          const lectureId = doc.id;
          const lectureContent = doc.data()
          if (lectureKeyList.hasOwnProperty(lectureContent.section.id)) {
            lectureKeyList[lectureContent.section.id] = [...lectureKeyList[lectureContent.section.id], {
              id: lectureId,
              ...lectureContent
            }]
          }
          else {
            lectureKeyList[lectureContent.section.id] = [{
              id: lectureId,
              ...lectureContent
            }]
          }
        })
        console.log(lectureKeyList)
      } catch (e) {
        console.error('Get lectureSnapshotList failed', e)
      }
    })()

    // get a list of lectures filtered by the id of the course
    // and then filter the lectures by the section id in an object
    // that has the id of the section as a key and the value of it
    // as the lecture (title, desciption and id)
    //   .then(snapList => {

    //     console.log('setLectureBySectioIdList')
    //     setLectureBySectioIdList(objectList)
    //   })
    // return lectureUnsubscribe()
  }, [])

  return (
    <div>
      <PanelTitle>{course.title}</PanelTitle>
      {/* {console.log(courseList)} */}
      <p>{course.description}</p>
      {course && course.id && <SectionPanel course={course} />}
    </div>
  )
}

export default Course
