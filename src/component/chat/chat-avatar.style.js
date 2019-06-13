import styled from 'styled-components'

export const StyledAvatar = styled.div`
  position: absolute;
  top: -1.5rem;
  left: 0.5rem;
  border-radius: 10px;
  background-image: url(${ ({ imagePath }) => imagePath });
  height: 48px;
  width: 48px;
`
