import styled from 'styled-components'
import { Router } from '@reach/router'

export const StyledRouter = styled(Router)`
  /* margin: 4.5rem 1rem 0; */
  background-color: ${({ theme }) => theme.menu.backgroundSelected};
  /* min-height: 100%; */
  margin: 1rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  `

export const StyledWebInfo = styled.div`
`
