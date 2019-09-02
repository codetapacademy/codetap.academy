import React, { useEffect, useState } from 'react';
import { StyledVideo, StyledVideoOverlay } from './play-video.style';
import CommentSection from '../comment-section';
import { db } from '../data/firebase';

const PlayVideo = ({ youtubeVideoId }) => {
  const [video, setVideo] = useState('')
  const lectureCollection = db.collection('lecture')
  useEffect(() => {
    (async () => {
      const lectureSnap = await lectureCollection
        .where('youtubeVideoId', '==', youtubeVideoId)
        .get()
      let youtubePlaylistId, order = 0
      lectureSnap.forEach(doc => {
        const data = doc.data()
        youtubePlaylistId = data.course.youtubePlaylistId
      })

      const lectureListSnap = await lectureCollection
        .where('course.youtubePlaylistId', '==', youtubePlaylistId)
        // .orderBy('order', 'asc')
        .get()
      lectureListSnap.docs.forEach((doc, key) => {
        const data = doc.data()
        if (data.youtubeVideoId === youtubeVideoId) {
          order = data.order ? data.order : key
        }
      })
      setVideo({ order, youtubePlaylistId })
    })()
  }, [youtubeVideoId, lectureCollection])
  const handleRightClick = e => {
    e.preventDefault();
    return;
  }
  return (
    <div>
      <StyledVideo>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/videoseries?list=${video.youtubePlaylistId}&index=${video.order}&modestbranding=1&rel=0&showinfo=1&loop=0&fs=0&hl=en&enablejsapi=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video Player in an iFrame"
        ></iframe>
        <StyledVideoOverlay onContextMenu={handleRightClick} />
      </StyledVideo>
      <CommentSection youtubeVideoId={youtubeVideoId} />
    </div>
  );
};

export default PlayVideo;
