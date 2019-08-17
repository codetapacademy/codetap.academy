import styled from 'styled-components'

export const StyledWidgetWrapper = styled.div`
  padding: 3.5rem 1rem 1rem 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 33.3%;
  height: 100%;
`

export const StyledApp = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: ${({ showWidgetBot }) => showWidgetBot
    ? 'minmax(200px, 2fr) minmax(100px, 1fr)'
    : 'minmax(100px, 1fr)'};
  background-color: ${({ theme }) => theme.layout.background};
  color: ${({ theme }) => theme.layout.text};
`
