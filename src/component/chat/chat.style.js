import styled from 'styled-components'

export const StyledMessageGroup = styled.div`
  /* border: 10px solid lightcoral; */
  border-radius: 10px;
  margin-bottom: 2rem;
  position: relative;
`

export const StyledChannelMessage = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto 1fr auto;
  border: 1px solid #030303;
  padding: 0.5rem 1rem;

  :not(:last-child) {
    border-bottom: none;
  }
`
