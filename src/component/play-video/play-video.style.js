import styled from 'styled-components';

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
