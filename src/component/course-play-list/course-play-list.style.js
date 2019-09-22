import styled from 'styled-components'

export const StyledListImageWrapper = styled.div`
  grid-row: 1/3;
  grid-column: 1/2;
`

export const StyledListLevelRequired = styled.div`
  grid-row: 3/4;
  grid-column: 1/3;
  position: relative;
  background-color: #c00;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
`

export const StyledListVideo = styled.div`
  grid-row: 3/4;
  grid-column: 1/3;
  position: relative;
  padding-top: 56.25%;
  width: 100%;
`

export const StyledListVideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const StyledListDescription = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
`

export const StyledListRow = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 208px 1fr 208px;
  grid-template-rows: 60px auto auto;
  margin-bottom: 2.5rem;

  img {
    max-width: 100%;
  }
`
