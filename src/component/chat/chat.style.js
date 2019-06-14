import styled from 'styled-components'

export const StyledNickname = styled.div`
  position: absolute;
  top: -0.7rem;
  ${ ({ leftOrRight }) => leftOrRight}: 5rem;
  background-color: white;
  padding: 0 0.5rem;
`

export const StyledTimestamp = styled.div`
  position: absolute;
  top: -0.7rem;
  ${ ({ leftOrRight }) => leftOrRight}: 2rem;
  background-color: white;
  padding: 0 0.5rem;
`

export const StyledChat = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  padding: 10px;
  background-color: #fff;
  position: relative;
  transition: 0.25s;
  top: 0;

  @media screen and (min-width: 1280px) {
    border-radius: 3px;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.06), 0 2px 5px 0 rgba(0,0,0,.2);
    top: 20px;
  }
`

export const StyledMessageGroup = styled.div`
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  position: relative;
`

export const StyledChannelMessage = styled.div`
  border: 1px solid #dfdfdf;
  padding: 0.8rem 1.2rem;
  position: relative;
  min-height: 2rem;

  :first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  :last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  :not(:last-child) {
    border-bottom: none;
  }
`
