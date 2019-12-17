import React, { useEffect, useState } from 'react'
import { db } from '../data/firebase';
import { StyledVideo, StyledVideoOverlay } from '../play-video/play-video.style';
import { StyledListRow, StyledListDescription, StyledListImageWrapper, StyledListVideo, StyledListVideoIframe, StyledListLevelRequired, StyledPlayerAndList, StyledList, StyledListWrapper, StyledPlayWrapper, StyledListTitle, StyledListDuration, StyledPlayMessage } from './course-play-list.style';
import { WebInfoState } from '../web-info/web-info.context';
import Vimeo from '@u-wave/react-vimeo'

const mapLevel = {
  supporter: 0,
  starter: 1,
  wise: 2,
  mentored: 3
}

const CoursePlayList = ({ courseId }) => {
  const [currentVideo, setCurrentVideo] = useState({})
  const lectureCollection = db.collection('lecture')
  const courseCollection = db.collection('course')
  const sectionCollection = db.collection('section')
  const [ data, updateData ] = useState({course: {}, lectureList: [], sectionList: []})
  const { user } = WebInfoState();
  const [ planLevel ] = ((user && user.plan_id) || 'supporter_').split('_')

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
      const lectureList = [...lectureListSnap.docs].map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => a.order - b.order)
      updateData({lectureList, sectionList, course})

      console.log(lectureList)

      if (lectureList.length && lectureList[0]) {
        const initialLectureList = lectureList.filter(lecture => lecture.section.id === sectionList[0].id)
        console.log(initialLectureList, sectionList[0].id, lectureList)
        setCurrentVideo(initialLectureList[0])
      }
    })()
    return () => {
      console.log('This is unload')
    }
  }, [])

  const onTimeUpdate = ({ seconds, duration }) => {
    console.log(~~seconds, ~~duration)
  }

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

      {course.version && course.version === 2 && <StyledPlayerAndList>
        {currentVideo.vimeoVideoId && currentVideo.levelRequired <= mapLevel[planLevel] && <Vimeo
          video={currentVideo.vimeoVideoId}
          onTimeUpdate={onTimeUpdate}
          responsive
        /> || <StyledPlayWrapper><StyledPlayMessage>Your member level is insufficient to watch this video. Consider upgrading or let's have a chat about it.</StyledPlayMessage></StyledPlayWrapper>}
          {/* {<StyledListVideo>
          </StyledListVideo>} */}
        <StyledListWrapper>
          <StyledList>
            {sectionList.map(section => {
              return (
                <div key={section.id}>
                  <h2>{section.title}</h2>
                  <div>
                    {lectureList
                      .filter(lecture => lecture.section.id === section.id && lecture.published)
                      .map(lecture => {
                        const { youtubeVideoId = ''} = lecture
                        return (
                          <StyledListRow
                            key={lecture.id}
                            onClick={() => setCurrentVideo(lecture)}
                            selected={currentVideo.vimeoVideoId === lecture.vimeoVideoId}>
                            <StyledListImageWrapper>
                              {youtubeVideoId && <img src={`http://img.youtube.com/vi/${youtubeVideoId}/0.jpg`} alt=""/>}
                            </StyledListImageWrapper>
                            <StyledListTitle>{lecture.title}</StyledListTitle>
                            <StyledListDuration>{lecture.duration}</StyledListDuration>
                            <StyledListDescription>{lecture.description}</StyledListDescription>
                          </StyledListRow>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })}
          </StyledList>
        </StyledListWrapper>
      </StyledPlayerAndList>}
    </div>
  )
}

export default CoursePlayList
