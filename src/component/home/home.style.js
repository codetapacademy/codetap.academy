import styled from 'styled-components'

export const StyledCourseList = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: ${({ theme }) => theme.layout.bigPadding};
`

export const StyledButtonWrapper = styled.div `
  display: flex;
  justify-content: space-around;
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

export const StyledCourseDescription = styled.p`
  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
  overflow-y: auto;
  position: absolute;
  /* left: 100%; */
  height: 100%;
  width: 100%;
  bottom: 0;
  padding: 0 0.5rem;
  text-align: left;
  text-overflow: ellipsis;
  opacity: 0;
  transition: 0.25s;
  margin: 0;
`

export const StyledCourseDescriptionWrapper = styled.div`
  top: 0.5rem;
  position: relative;
  width: 100%;
  background-image: 
    url(${({ externalThumbnail }) => externalThumbnail});
  background-size: cover;
  background-position: center center;
  padding-top: 56.25%;
  overflow: hidden;

  &:hover ${StyledCourseDescription} {
    /* left: 0%; */
    opacity: 1;
  }
`

export const StyledCourseDuration = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-around;
`

export const StyledCourse = styled.div `
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  text-align: center;
  background-color: ${({ theme: { menu: { background } } }) => background};
`