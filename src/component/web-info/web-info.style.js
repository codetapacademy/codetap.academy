import styled from 'styled-components'
import { Router } from '@reach/router'

export const StyledRouter = styled(Router)`
  background-color: ${({ theme }) => theme.menu.backgroundSelected};
  padding: ${({ theme }) => theme.layout.bigPadding};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
`

export const StyledWebInfo = styled.div`
  min-height: 100%;
  padding: ${({ theme }) => theme.layout.bigPadding};
  padding-top: 84px;
`
