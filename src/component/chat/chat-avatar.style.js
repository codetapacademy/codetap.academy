import styled from 'styled-components'

export const StyledAvatar = styled.div`
  border-radius: 10px;
  background-image: url(${ ({ imagePath }) => imagePath });
  height: 48px;
  width: 48px;
`
