import styled from 'styled-components'

export const StyledCourseList = styled.div `
  display: flex;
  flex-wrap: wrap;
`

export const StyledWatchNow = styled.button `
  background-color: #d52027;
  color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  transition: 0.15s;
  cursor: pointer;

  &:hover {
    transform: scale(1.25);
    color: #d52027;
    background-color: #fff;
  }
`

export const StyledCourse = styled.div `
  width: 325px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url(${({ externalThumbnail }) => externalThumbnail});
  background-size: cover;
  background-position: center center;
  position: relative;
  text-align: center;
`