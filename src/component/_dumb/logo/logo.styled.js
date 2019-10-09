import styled from 'styled-components'
import { logoBase64 } from './logo.data'

export const StyledLogo = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  background-repeat: no-repeat;
  background-image: url(${logoBase64});
`
