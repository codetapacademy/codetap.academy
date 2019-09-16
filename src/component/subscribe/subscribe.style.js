import styled from 'styled-components'

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