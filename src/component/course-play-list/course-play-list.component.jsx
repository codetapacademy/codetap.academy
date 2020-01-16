import React, { useEffect, useState, useRef } from 'react'
import { db } from '../data/firebase';
import { StyledVideo, StyledVideoOverlay } from '../play-video/play-video.style';
import { StyledReactPlayerWrapper, StyledReactPlayer, StyledListRow, StyledListDescription, StyledListImageWrapper, StyledListVideo, StyledListVideoIframe, StyledListLevelRequired, StyledPlayerAndList, StyledList, StyledListWrapper, StyledPlayWrapper, StyledListTitle, StyledListDuration, StyledPlayMessage } from './course-play-list.style';
import { WebInfoState } from '../web-info/web-info.context';

const mapLevel = {
  supporter: 0,
  starter: 1,
  wise: 2,
  mentored: 3
}

const CoursePlayList = ({ courseId }) => {
  const playedHistory = useRef({})
  const [currentVideo, setCurrentVideo] = useState({})
  const lectureCollection = db.collection('lecture')
  const courseCollection = db.collection('course')
  const sectionCollection = db.collection('section')
  const playHistoryCollection = db.collection('play-history')
  const [data, updateData] = useState({ course: {}, lectureList: [], sectionList: [] })
  const { user } = WebInfoState();
  const [planLevel] = ((user && user.plan_id) || 'supporter_').split('_')

  // '01:25:41' -> split
  // ['01', '25', '41'] -> reverse()
  // ['41', '25', '01']
  const getTotalSeconds = duration => duration
    .split(':')
    .reverse()
    .map((v, c) => +v * Math.pow(60, c))
    .reduce((a, c) => a + c, 0)

  // {name: 'Marian', 0: 0, 1: 0, 2: 0, ...., 150: 0}
  const getPlayHistoryObject = seconds => Array
    .from({ length: seconds + 1 }, (_, k) => k)
    // [0, 1, 2, 3, 4, ..., 150]
    .reduce((a, c) => ({ ...a, [c]: 0 }), {})

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
      updateData({ lectureList, sectionList, course })

      console.log(lectureList)

      if (lectureList.length && lectureList[0]) {
        const initialLectureList = lectureList.filter(lecture => lecture.section.id === sectionList[0].id)
        console.log(initialLectureList, sectionList[0].id, lectureList)
        setCurrentVideo(initialLectureList[0])
        console.log(courseId, user.uid, lectureList[0], lectureList[0].duration, lectureList[0].id)
        let playHistoryData = {
          courseId,
          userId: user.uid,
          duration: lectureList[0].duration,
          lectureId: lectureList[0].id,
        }

        let playHistoryQuery = playHistoryCollection.where('courseId', '==', playHistoryData.courseId)
          .where('userId', '==', playHistoryData.userId)
          .where('duration', '==', playHistoryData.duration)
          .where('lectureId', '==', playHistoryData.lectureId)
        const playHistorySnap = await playHistoryQuery.get()
        const playHistory = [...playHistorySnap.docs]
        if (playHistory.length) {
          console.log('********************** data', playHistory[0].id, playHistory[0].data())
        } else {
          console.log('********************** no data')
          const history = getPlayHistoryObject(getTotalSeconds(playHistoryData.duration))
          playHistoryCollection.add({ ...playHistoryData, history })
        }
      }
    })()
    return () => {
      console.log('This is unload')
    }
  }, [])

  const onTimeUpdate = ({ seconds, duration }) => {
    console.log(~~seconds, ~~duration)
  }

  const onProgress = ({ playedSeconds, played }) => {
    // {playedSeconds: 0, played: 0, loadedSeconds: 6.033, loaded: 0.039965552648140175}
    const currentSecond = ~~playedSeconds

    if (playedHistory.current.hasOwnProperty(currentSecond)) {
      playedHistory.current = {
        ...playedHistory.current,
        [currentSecond]: playedHistory.current[currentSecond] + 1
      }
    } else {
      playedHistory.current = {
        ...playedHistory.current,
        [currentSecond]: 1
      }
    }
    console.log(playedHistory)
  }

  const { course, sectionList, lectureList } = data
  return (
    <div>
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
        {currentVideo.vimeoVideoId && <StyledReactPlayerWrapper><StyledReactPlayer
          url={`https://vimeo.com/${currentVideo.vimeoVideoId}`}
          controls
          width="100%"
          height="100%"
          onProgress={onProgress}
        /></StyledReactPlayerWrapper>}
        {currentVideo.vimeoVideoId && currentVideo.levelRequired <= mapLevel[planLevel] || <StyledPlayWrapper><StyledPlayMessage>Your member level is insufficient to watch this video. Consider upgrading or let's have a chat about it.</StyledPlayMessage></StyledPlayWrapper>}

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
                        const { youtubeVideoId = '' } = lecture
                        return (
                          <StyledListRow
                            key={lecture.id}
                            onClick={() => setCurrentVideo(lecture)}
                            selected={currentVideo.vimeoVideoId === lecture.vimeoVideoId}>
                            <StyledListImageWrapper>
                              {youtubeVideoId && <img src={`http://img.youtube.com/vi/${youtubeVideoId}/0.jpg`} alt="" />}
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
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </div>
  )
}

export default CoursePlayList
