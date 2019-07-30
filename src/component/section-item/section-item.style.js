import styled from 'styled-components'

export const StyledSectionItem = styled.div.attrs({'data-id': 'section-item'})`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.layout.bigPadding};
`

export const StyledSectionButtonGroup = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, auto);
  grid-gap: 0.25rem;
  top: 1rem;
  transition: 0.25s;

  ${({ side }) => side}: -100%;

  ${StyledSectionItem}:hover > & {
    ${({ side }) => side}: 1rem;
  }
`
