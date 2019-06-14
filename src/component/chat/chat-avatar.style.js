import styled from 'styled-components'

export const StyledAvatar = styled.div`
  border-radius: 50%;
  border: 2px solid #f1f1f1;
  background-image: url(${ ({ imagePath }) => imagePath });
  height: 48px;
  width: 48px;
  margin: 0.5rem;
  margin-top: -36px;
  float: ${ ({ leftOrRight }) => leftOrRight};
  margin-left: -4px;
`
