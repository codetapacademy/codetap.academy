import styled from 'styled-components'

export const StyledListImageWrapper = styled.div`
  grid-row: 1/3;
  grid-column: 1/2;
`

export const StyledListDescription = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
`

export const StyledListRow = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 208px 1fr 208px;
  grid-template-rows: 60px auto;

  img {
    max-width: 100%;
  }
`
