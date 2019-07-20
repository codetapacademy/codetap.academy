import styled from 'styled-components'
import { Router } from '@reach/router'

export const StyledRouter = styled(Router)`
  padding: 2rem 1rem 0;
`

export const StyledWebInfo = styled.div`
  border-radius: ${({ theme }) => theme.layout.borderRadius};
`
