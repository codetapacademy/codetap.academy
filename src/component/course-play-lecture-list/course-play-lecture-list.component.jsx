import React from 'react'
import {
  StyledListRow,
  StyledListDescription,
  StyledListTitle,
  StyledListDuration,
  StyledListInput,
  StyledListLabel,
} from './course-play-lecture-list.style';
// sort-amount-desc
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
          <StyledListTitle title={lecture.title}>{lecture.title}</StyledListTitle>
          <StyledListInput id={`toggle-${lecture.id}`} type="checkbox" />
          <StyledListLabel
            htmlFor={`toggle-${lecture.id}`}
            className="codetap-academy-sort-amount-desc"
          />
          <StyledListDuration>{lecture.duration} <i className="codetap-academy-clock" /></StyledListDuration>
          <StyledListDescription>{lecture.description}</StyledListDescription>
        </StyledListRow>
      )
    })
}

export { CoursePlayLectureList }
