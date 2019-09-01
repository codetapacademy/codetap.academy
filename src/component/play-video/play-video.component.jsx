import React from 'react';
import { StyledVideo, StyledVideoOverlay } from './play-video.style';
import CommentSection from '../comment-section';

const PlayVideo = ({ youtubeVideoId }) => {
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
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <StyledVideoOverlay onContextMenu={handleRightClick} />
      </StyledVideo>
      <CommentSection youtubeVideoId={youtubeVideoId} />
    </div>
  );
};

export default PlayVideo;
