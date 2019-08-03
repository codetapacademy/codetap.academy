import styled from 'styled-components'

export const StyledThumbnail = styled.div`
  width: 100%;
  padding-top: ${({ ratio }) => ratio}%;
  background-image: url(${({ imagePath }) => imagePath});
  background-size: cover;
  background-position: center center;
`
