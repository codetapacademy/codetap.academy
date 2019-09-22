import React, { useEffect, useState } from 'react'
import { db } from '../data/firebase';
import { StyledVideo, StyledVideoOverlay } from '../play-video/play-video.style';

const CoursePlayList = ({ courseId }) => {
  const lectureCollection = db.collection('lecture')
  const courseCollection = db.collection('course')
  const sectionCollection = db.collection('section')
  const [ data, updateData ] = useState({course: {}, lectureList: [], sectionList: []})

  useEffect(() => {
    (async () => {
      const courseSnap = await courseCollection.doc(courseId).get()
      const course = { id: courseSnap.id, ...courseSnap.data() }

      const sectionListSnap = await sectionCollection
        .where('course.id', '==', courseId)
        .get()
      const sectionList = [...sectionListSnap.docs]
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.order - b.order)

      const lectureListSnap = await lectureCollection
        .where('course.id', '==', courseId)
        .get()
      const lectureList = [...lectureListSnap.docs].map(doc => doc.data()).sort((a, b) => a.order - b.order)
      updateData({lectureList, sectionList, course})
    })()
  }, [])
  const { course, sectionList, lectureList } = data
  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      {course.version && course.version === 1 && <StyledVideo>
        {course && <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/videoseries?list=${course.youtubePlaylistId}&index=0&modestbranding=1&rel=0&showinfo=1&loop=0&fs=0&hl=en&enablejsapi=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video Player in an iFrame"
        ></iframe>}
      </StyledVideo>}

      {course.version && course.version === 2 && <div>
        {sectionList.map(section => {
          return console.log(section) || (
            <div key={section.id}>
              <h2>{section.title}</h2>
              <h2>{course.youtubePlaylistId}</h2>
              <div>
                {lectureList
                  .filter(lecture => lecture.section.id === section.id)
                  .map(lecture => {
                    return (
                      <div>
                        <img src={`http://img.youtube.com/vi/${lecture.youtubeVideoId}/0.jpg`} alt=""/>
                        <div>{lecture.title}</div>
                        <div>{lecture.description}</div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default CoursePlayList
