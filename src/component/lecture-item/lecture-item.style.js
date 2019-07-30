import styled from 'styled-components'

export const StyledLectureItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 1rem;
  padding: ${({ theme }) => `${theme.layout.defaultPadding} ${theme.layout.bigPadding}`};
`
