import styled from 'styled-components'

export const StyledSectionList = styled.div`
  border: 1px solid ${({ theme }) => theme.layout.borderColor};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  padding: ${({ theme }) => theme.layout.defaultPadding};
`
