import styled from 'styled-components'

export const StyledApp = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  background-color: ${({ theme }) => theme.layout.background};
  color: ${({ theme }) => theme.layout.text};
`
