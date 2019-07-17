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
  background-color: #d52027;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-evenly;
`
