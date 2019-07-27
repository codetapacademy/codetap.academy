import styled from 'styled-components'

export const StyledSectionList = styled.div`
  border: 1px solid ${({ theme }) => theme.layout.borderColor};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  overflow: hidden;
`

export const StyledSectionItem = styled.div`
  background-color: ${({ theme }) => theme.layout.background};
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.layout.backgroundText};
  }
`
