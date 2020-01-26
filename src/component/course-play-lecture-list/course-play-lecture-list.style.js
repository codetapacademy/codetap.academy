import styled from 'styled-components'

export const StyledListRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;

  background-color: ${({ selected }) => selected ? 'gray' : 'transparent'};
`

export const StyledListImageWrapper = styled.div`
  grid-row: 1/3;
  max-width: 100%;

  img {
    max-width: 100%;
  }
`

export const StyledListDescription = styled.div`
  grid-column: 1/3;
  margin-bottom: 1rem;
  display: none;
`

export const StyledListTitle = styled.h3`
  margin: 0;
`

export const StyledListDuration = styled.div`
  margin: 0;
  font-size:0.9rem;
  text-align: right;
  padding-right: 0.5rem;
`
