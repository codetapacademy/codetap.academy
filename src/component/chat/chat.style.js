import styled from 'styled-components'

export const StyledChat = styled.div`
  border-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.06), 0 2px 5px 0 rgba(0,0,0,.2);
  margin: 0 auto;
  width: 1280px;
  top: 20px;
  padding: 10px;
  background-color: #fff;
  position: relative;
`

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
