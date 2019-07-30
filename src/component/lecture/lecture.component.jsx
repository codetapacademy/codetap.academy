import React, { useEffect, useState } from 'react'
import { db } from '../data/firebase'
import { Link } from '@reach/router';

const Lecture = ({ lectureId }) => {
  const [ lecture, setLecture ] = useState()
  useEffect(() => {
    (async () => {
      const lectureSnapshot = await db
        .collection('lecture')
        .doc(lectureId)
        .get()

      setLecture(lectureSnapshot.data())
    })()
  }, [])

  return (
    <div>
      {console.log(lecture)}
      <h1>Lecture {lectureId}</h1>
      {lecture && lecture.course && <p>Back to <Link to={`/course/${lecture.course.id}`}>{lecture.course.title}</Link></p> }
    </div>
  )
}

export default Lecture
