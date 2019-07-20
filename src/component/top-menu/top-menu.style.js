import styled from 'styled-components'
import { Link } from '@reach/router'

export const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 1rem;
  color: white;
  transition: 0.25s;

  &:hover {
    color: #c00;
    background-color: white;
  }
`

export const StyledTopMenu = styled.div`
  background-color: ${({ theme }) => theme.menu.background};
  display: flex;
  justify-content: space-evenly;
  position: sticky;
  top: 0;
  width: 100%;
`
