import styled from 'styled-components'
import { Link } from '@reach/router';

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`

export const StyledLectureItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-gap: 1rem;
  background-color:  ${({ theme }) => `${theme.menu.background}`};
  padding: ${({ theme }) => `${theme.layout.defaultPadding} ${theme.layout.bigPadding}`};
`
