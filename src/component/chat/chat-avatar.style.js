import styled from 'styled-components'

export const StyledAvatar = styled.div`
  position: absolute;
  top: -1.5rem;
  left: 0.5rem;
  border-radius: 50%;
  background-size: cover;
  border: 2px solid #f1f1f1;
  background-image: url(${ ({ imagePath }) => imagePath });
  height: 48px;
  width: 48px;
`
