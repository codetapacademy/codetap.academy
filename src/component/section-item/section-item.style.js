import styled from 'styled-components'

export const StyledSectionItem = styled.div`
  position: relative;
  overflow: hidden;
`

export const StyledSectionButton = styled.button`
  position: absolute;
  top: 0;
  transition: 0.25s;

  ${({ side }) => side}: -100px;

  ${StyledSectionItem}:hover > & {
    ${({ side }) => side}: 0;
  }
`
