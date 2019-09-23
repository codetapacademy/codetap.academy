import styled from 'styled-components'

export const StyledSubscribeButton = styled.button `
  background-color: ${({ bgcolor }) => bgcolor || '#d52027'};
  border: 1px solid rgba(0,0,0,0.21);
  border-bottom: 4px solid rgba(0,0,0,0.21);
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
`

export const StyledSubscribeList = styled.div `
  display: flex;
  margin-bottom: 1rem;
`

export const StyledSubscribeItem = styled.div `
  flex-basis: 25%;
  border: 1px solid white;
  border-radius: 0.5rem;
  text-align: center;
  padding: 1rem;

  ${({ selected }) => selected && `
transform: scale(1.075);
`}

  &:not(:last-child) {
    margin-right: 1rem;
  }
`

export const StyledSubscribeRangeWrapper = styled.div `
`

export const StyledSubscribeTitle = styled.h3 `
  text-align: center
`

export const StyledSubscribePrice = styled.h4 `
  text-align: center
`