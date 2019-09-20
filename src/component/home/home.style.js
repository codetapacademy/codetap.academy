import styled from 'styled-components'

export const StyledCourseList = styled.div `
  display: flex;
  flex-wrap: wrap;
`

export const StyledCourse = styled.div `
  width: 325px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-image: url(${({ externalThumbnail }) => externalThumbnail});
  background-size: cover;
  background-position: center center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .73);
  }
`