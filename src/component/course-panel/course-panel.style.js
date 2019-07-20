import styled from 'styled-components'

export const StyledPanelTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  padding: 1rem 0;

  &:first-child {
    padding-top: 0;
  }
`

export const StyledControlPanel = styled.div`
  border-radius: ${({ theme }) => theme.layout.borderRadius}
`
