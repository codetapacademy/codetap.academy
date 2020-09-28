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

export const StyledListWrapper = styled.div`
  position: relative;
`

export const StyledPlayerAndList = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 3fr 1fr;
  margin-bottom: 2.5rem;
`

export const StyledList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  -ms-overflow-style: none;
/* 
  &::-webkit-scrollbar {
    display: none;
  } */
`

export const StyledSectionListTitle = styled.div`
  font-size: 1.1rem;
  padding: 0.25rem 0;
  margin-bottom: 0.5rem;
  border: 1px dashed white;
  border-left: 0;
  border-right: 0;
`
