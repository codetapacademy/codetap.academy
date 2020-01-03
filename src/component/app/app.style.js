import styled from 'styled-components'

export const StyledApp = styled.div`
  min-height: 100%;
  flex-basis: 100%;
  background-color: ${({ theme }) => theme.layout.background};
  color: ${({ theme }) => theme.layout.text};
`
