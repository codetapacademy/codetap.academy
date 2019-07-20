import styled from 'styled-components'

export const StyledActionButtonWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 1/3;
  align-self: stretch;
  & > button {
    height: 100%;

    &:last-child {
      margin-left: 0.5rem;
    }
  }
`

export const StyledCourseEdit = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  grid-gap: 0.5rem;
`
