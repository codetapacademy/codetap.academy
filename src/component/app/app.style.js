import styled from 'styled-components'

export const StyledApp = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: ${({ showWidgetBot }) => showWidgetBot 
    ? '2fr 1fr' 
    : '1fr'};
  /* padding: 1rem; */
  /* grid-gap: 1rem; */
  background-color: ${({ theme }) => theme.layout.background};
  color: ${({ theme }) => theme.layout.text}
`
