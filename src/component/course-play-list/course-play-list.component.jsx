import React, { useEffect, useState, useRef } from 'react'
import { db } from '../data/firebase';
import { StyledVideo, StyledVideoOverlay } from '../play-video/play-video.style';
import { StyledReactPlayerWrapper, StyledReactPlayer, StyledListRow, StyledListDescription, StyledListImageWrapper, StyledListVideo, StyledListVideoIframe, StyledListLevelRequired, StyledPlayerAndList, StyledList, StyledListWrapper, StyledPlayWrapper, StyledListTitle, StyledListDuration, StyledPlayMessage } from './course-play-list.style';
import { WebInfoState } from '../web-info/web-info.context';
import { HistoryGraph } from '../_dumb/history-graph/history-graph.component';

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
    let playHistoryQuery
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
        updateCurrentVideo(initialLectureList[0])
      }
    })()
    return () => {
      console.log('This is unload')
      updatePreviousVideo()
    }
  }, [])

  const onTimeUpdate = ({ seconds, duration }) => {
    console.log(~~seconds, ~~duration)
  }

  const onProgress = ({ playedSeconds, played }) => {
    // {playedSeconds: 0, played: 0, loadedSeconds: 6.033, loaded: 0.039965552648140175}
    const currentSecond = ~~playedSeconds

    if (playedHistory.current.history && playedHistory.current.history.hasOwnProperty(currentSecond)) {
      playedHistory.current = {
        ...playedHistory.current,
        history: {
          ...playedHistory.current.history,
          [currentSecond]: playedHistory.current.history[currentSecond] + 1
        }
      }
    } else {
      playedHistory.current = {
        ...playedHistory.current,
        history: {
          ...playedHistory.current.history,
          [currentSecond]: 1
        }
      }
    }
    console.log(playedHistory)
  }

  const updatePreviousVideo = () => {
    if (currentVideo && playedHistory.current.firebaseId) {
      const { history, firebaseId } = playedHistory.current
      playHistoryCollection.doc(firebaseId)
        .set({ history }, { merge: true })
    }
  }

  const updateCurrentVideo = lecture => {
    // Check to see if there is a current video different than lecture
    // This is to update the history of a previous selected video
    updatePreviousVideo()

    // Swicth to new lecture
    let playHistoryData = {
      courseId,
      userId: user.uid,
      duration: lecture.duration,
      lectureId: lecture.id,
    }

    playHistoryCollection
      .where('courseId', '==', playHistoryData.courseId)
      .where('userId', '==', playHistoryData.userId)
      .where('lectureId', '==', playHistoryData.lectureId)
      .get()
      .then(snap => {
        if (snap.docs.length) {

          snap.docs.forEach(doc => {
            playedHistory.current = { ...doc.data(), firebaseId: doc.id }
          })
        } else {
          const history = getPlayHistoryObject(getTotalSeconds(playHistoryData.duration))
          playedHistory.current = { ...playHistoryData, history };
          const firebaseId = playHistoryCollection.doc().id
          playHistoryCollection.doc(firebaseId).set(playedHistory.current)
        }
        setCurrentVideo(lecture)
      })
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
        {currentVideo.vimeoVideoId && <>
          <StyledReactPlayerWrapper>
            <StyledReactPlayer
              url={`https://vimeo.com/${currentVideo.vimeoVideoId}`}
              controls
              width="100%"
              height="100%"
              onProgress={onProgress}
            />
            <HistoryGraph data={playedHistory.current.history} />
          </StyledReactPlayerWrapper>
        </>}
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
                            onClick={() => updateCurrentVideo(lecture)}
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
