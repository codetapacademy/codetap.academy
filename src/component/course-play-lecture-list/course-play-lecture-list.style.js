import styled from 'styled-components'

export const StyledListInput = styled.input`
  display: none;
`

export const StyledListLabel = styled.label`
  cursor: pointer;
  display: flex;

  ${StyledListInput}:checked + &::before {
    transform: rotate(180deg);
  }
`

export const StyledListRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;
  cursor: pointer;

  background-color: ${({ selected }) => selected ? 'gray' : 'transparent'};
`

export const StyledListDescription = styled.div`
  grid-column: 1/3;
  margin-bottom: 1rem;
  display: none;

  ${StyledListInput}:checked ~ & {
    display: block;
  }
`

export const StyledListTitle = styled.h3`
  margin: 0;
  font-size: 0.875rem;
  grid-column: 1/-1;
  /* white-space: pre;
  text-overflow: ellipsis;
  overflow: hidden; */
`

export const StyledListDuration = styled.div`
  margin: 0;
  font-size:0.9rem;
  text-align: right;
  padding-right: 0.5rem;
  grid-column: 2/3;
`
