import styled from 'styled-components'

export const StyledProgressBar = styled.progress`
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  opacity: 0.25;
  position: absolute;
  pointer-events: none;
`

export const StyledImageUploader = styled.div`
  width: 100%;
  /* 9 devided by 16 = 56.25 */
  padding-top: 56.25%;
  background-image: url(${({ imagePath }) => imagePath});
  background-size: cover;
  background-position: center center;
  position: relative;
`
