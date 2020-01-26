import React from 'react'
import {
  StyledListRow,
  StyledListDescription,
  StyledListImageWrapper,
  StyledListTitle,
  StyledListDuration,
} from './course-play-lecture-list.style';

const CoursePlayLectureList = ({ lectureList, updateCurrentVideo, currentVideo, section }) => {
  return lectureList
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

export { CoursePlayLectureList }
