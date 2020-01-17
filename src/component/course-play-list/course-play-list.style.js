import styled from 'styled-components'
import ReactPlayer from 'react-player'

export const StyledReactPlayerWrapper = styled.div`
  padding-top: 56.25%;
  position: relative;
`

export const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const StyledPlayWrapper = styled.div`
  padding-top: 56.25%;
  position: relative;
`

export const StyledPlayMessage = styled.h2`
  position: absolute;
  top: 0;
  left: 0;
`

export const StyledListDescription = styled.div`
  grid-column: 1/3;
  margin-bottom: 1rem;
`
export const StyledListImageWrapper = styled.div`
  grid-row: 1/3;
  max-width: 100%;

  img {
    max-width: 100%;
  }
`
export const StyledListWrapper = styled.div`
  position: relative;
`
export const StyledList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
`

export const StyledListRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;

  background-color: ${({ selected }) => selected ? 'gray' : 'transparent'};
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

export const StyledPlayerAndList = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 3fr 1fr;
  margin-bottom: 2.5rem;
`
