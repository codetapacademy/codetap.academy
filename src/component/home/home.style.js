import styled from 'styled-components'

export const StyledCourseHeaderWrapper = styled.div `
  height: 48px;
  display: flex;
  justify-content: space-between;
`

export const StyledCourseTitle = styled.div `
  font-size: 1rem;
  line-height: 48px;
  padding: 0 20px;
  flex-grow: 1;
  text-align: left;
  font-weight: bold;
`

export const StyledTimeIcon = styled.div`
  font-size: 1rem;
  padding: 0 ${({ theme }) => theme.layout.defaultPadding};
`

export const StyledCourseDuration = styled.div`
  line-height: 48px;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const StyledCourseAuthors = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.layout.defaultPadding} ${({ theme }) => theme.layout.bigPadding};
`

export const StyledCourseList = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: ${({ theme }) => theme.layout.bigPadding};
`

export const StyledButtonWrapper = styled.div `
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.layout.bigPadding};
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
  padding: ${({ theme }) => theme.layout.defaultPadding} 20px;
  margin: 0;
  text-align: left;
  text-overflow: ellipsis;
  font-family: Roboto;
  font-size: 1rem;
  flex-grow: 1;
`

export const StyledCourseDescriptionWrapper = styled.div`
  position: relative;
  width: 100%;
  background-image: 
    url(${({ externalThumbnail }) => externalThumbnail});
  background-size: cover;
  background-position: center center;
  padding-top: 56.25%;
  overflow: hidden;

  &::after {
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: 5px solid ${({ theme: { menu: { background } } }) => background};
    position: absolute;
    border-top-width: 0;
  }

  &:hover ${StyledCourseDescription} {
    /* left: 0%; */
    opacity: 1;
  }
`

export const StyledCourse = styled.div `
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  text-align: center;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme: { menu: { background } } }) => background};
`