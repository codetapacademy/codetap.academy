import React from 'react';
import { StyledVideo } from './play-video.style';

const PlayVideo = ({ youtubeVideoId }) => {
  return (
    <StyledVideo>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </StyledVideo>
  );
};

export default PlayVideo;
