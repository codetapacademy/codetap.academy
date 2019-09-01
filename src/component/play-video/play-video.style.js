import styled from 'styled-components';

export const StyledVideoOverlay = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0
`

export const StyledVideo = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;

  & iframe {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
