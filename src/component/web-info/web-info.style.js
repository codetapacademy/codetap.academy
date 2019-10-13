import styled from 'styled-components'
import { Router } from '@reach/router'

export const StyledRouter = styled(Router)`
  /* margin: 4.5rem 1rem 0; */
  background-color: ${({ theme }) => theme.menu.backgroundSelected};
  /* min-height: 100%; */
  margin: ${({ theme }) => theme.layout.bigMargin};
  padding: ${({ theme }) => theme.layout.bigPadding};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  `

export const StyledWebInfo = styled.div`
  height: 100%;
  overflow-y: auto;
`
