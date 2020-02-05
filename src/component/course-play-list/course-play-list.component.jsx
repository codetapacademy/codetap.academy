import React, { useEffect, useState, useRef, useReducer } from 'react'
import { db } from '../data/firebase';
import { StyledVideo, StyledVideoOverlay } from '../play-video/play-video.style';
import {
  StyledReactPlayerWrapper,
  StyledReactPlayer,
  StyledPlayerAndList,
  StyledList,
  StyledListWrapper,
  StyledPlayWrapper,
  StyledPlayMessage,
  StyledSectionListTitle,
} from './course-play-list.style';
import { WebInfoState } from '../web-info/web-info.context';
import { HistoryGraph } from '../_dumb/history-graph/history-graph.component';
import { historyReducer } from './course-play-list.reducer';
import { mapLevel, getTotalSeconds, getPlayHistoryObject, getPercentage } from './course-play-list.util';
import { updateHistoryAction, initHistoryAction } from './course-play-list.action';
import { CoursePlayLectureList } from '../course-play-lecture-list/course-play-lecture-list.component';

const CoursePlayList = ({ courseId }) => {
  const [playedHistory, updatePlayedHistory] = useReducer(historyReducer, {})
  const internalPlaySettings = useRef({
    ceilSeccond: 0,
    saveSecondsInterval: 5,
    currentPlayBeforeSave: 0,
  })
  const [currentVideo, setCurrentVideo] = useState({})
  const lectureCollection = db.collection('lecture')
  const courseCollection = db.collection('course')
  const sectionCollection = db.collection('section')
  const playHistoryCollection = db.collection('play-history')
  const [data, updateData] = useState({ course: {}, lectureList: [], sectionList: [] })
  const { user } = WebInfoState();
  const [planLevel] = ((user && user.plan_id) || 'supporter_').split('_')


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

      if (lectureList.length && lectureList[0]) {
        const initialLectureList = lectureList.filter(lecture => lecture.section.id === sectionList[0].id)
        updateCurrentVideo(initialLectureList[0])
      }
    })()
    return () => {
      updatePreviousVideo()
    }
  }, [])

  const onEnded = () => {
    updatePreviousVideo()
  }

  const onProgress = ({ playedSeconds }) => {
    const currentSecond = Math.ceil(playedSeconds)
    console.log(currentSecond, playedSeconds, `${getPercentage(playedHistory.history)}%`, playedHistory)
    if (currentSecond !== internalPlaySettings.current.ceilSeccond) {
      internalPlaySettings.current.ceilSeccond = currentSecond

      internalPlaySettings.current.currentPlayBeforeSave += 1
      if (internalPlaySettings.current.currentPlayBeforeSave === internalPlaySettings.current.saveSecondsInterval) {
        updatePreviousVideo()
        internalPlaySettings.current.currentPlayBeforeSave = 0
      }

      const secondToUpdate = playedHistory.history && playedHistory.history.hasOwnProperty(currentSecond) ? currentSecond : 0
      updatePlayedHistory(updateHistoryAction(secondToUpdate))
    }
  }

  const updatePreviousVideo = () => {
    if (currentVideo && playedHistory.firebaseId) {
      const { history, firebaseId } = playedHistory
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
      watched: 0, // as percentage
      completed: false,
    }

    playHistoryCollection
      .where('courseId', '==', playHistoryData.courseId)
      .where('userId', '==', playHistoryData.userId)
      .where('lectureId', '==', playHistoryData.lectureId)
      .get()
      .then(snap => {
        if (snap.docs.length) {

          snap.docs.forEach(doc => {
            updatePlayedHistory(initHistoryAction({ ...doc.data(), firebaseId: doc.id }))
          })
        } else {
          const history = getPlayHistoryObject(getTotalSeconds(playHistoryData.duration))
          const firebaseId = playHistoryCollection.doc().id
          const playedHistoryObject = { ...playHistoryData, history, firebaseId }
          updatePlayedHistory(initHistoryAction(playedHistoryObject))
          playHistoryCollection.doc(firebaseId).set(playedHistoryObject)
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
              progressInterval={250}
              onProgress={onProgress}
              onEnded={onEnded}
            />
            <HistoryGraph data={playedHistory.history} height={8} />
          </StyledReactPlayerWrapper>
        </>}
        {currentVideo.vimeoVideoId && currentVideo.levelRequired <= mapLevel[planLevel] || <StyledPlayWrapper><StyledPlayMessage>Your member level is insufficient to watch this video. Consider upgrading or let's have a chat about it.</StyledPlayMessage></StyledPlayWrapper>}

        <StyledListWrapper>
          <StyledList>
            {sectionList.map(section => {
              return (
                <div key={section.id}>
                  <StyledSectionListTitle>{section.title}</StyledSectionListTitle>
                  <CoursePlayLectureList
                    lectureList={lectureList}
                    updateCurrentVideo={updateCurrentVideo}
                    currentVideo={currentVideo}
                    section={section}
                  />
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
