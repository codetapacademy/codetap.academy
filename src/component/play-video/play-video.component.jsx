import React, { useEffect, useState } from 'react';
import { StyledVideo, StyledVideoOverlay } from './play-video.style';
import CommentSection from '../comment-section';
import { db } from '../data/firebase';

const PlayVideo = ({ youtubeVideoId }) => {
  const [video, setVideo] = useState('')
  const lectureCollection = db.collection('lecture')
  const courseCollection = db.collection('course')
  const sectionCollection = db.collection('section')
  useEffect(() => {
    (async () => {
      const lectureSnap = await lectureCollection
        .where('youtubeVideoId', '==', youtubeVideoId)
        .get()
      let courseId
      lectureSnap.forEach(doc => {
        const data = doc.data()
        courseId = data.course.id
      })

      const course = await courseCollection.doc(courseId).get()
      const { youtubePlaylistId } = course.data()

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
      const { index } = sectionList
        .flatMap(section => lectureList.filter(lecture => lecture.section.id === section.id))
        .map((lecture, index) => ({ ...lecture, index }))
        .filter(lecture => lecture.youtubeVideoId === youtubeVideoId)[0]

      setVideo({ index, youtubePlaylistId })
    })()
  }, [])
  const handleRightClick = e => {
    e.preventDefault();
    return;
  }
  return (
    <div>
      {/* video.index {video.index} */}
      <StyledVideo>
        {video && <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/videoseries?list=${video.youtubePlaylistId}&index=${video.index}&modestbranding=1&rel=0&showinfo=1&loop=0&fs=0&hl=en&enablejsapi=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video Player in an iFrame"
        ></iframe>}
        <StyledVideoOverlay onContextMenu={handleRightClick} />
      </StyledVideo>
      <CommentSection youtubeVideoId={youtubeVideoId} />
    </div>
  );
};

export default PlayVideo;
