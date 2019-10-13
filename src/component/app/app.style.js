import styled from 'styled-components'

export const StyledApp = styled.div`
  height: 100%;
  display: grid;
  background-color: ${({ theme }) => theme.layout.background};
  color: ${({ theme }) => theme.layout.text};
`
