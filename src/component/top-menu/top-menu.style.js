import styled from 'styled-components'
import { Link } from '@reach/router'

export const StyledLogoWrapper = styled.span`
  display: flex;
  align-items: center;
/* 
  &:hover {
    color: black;
  } */
`

export const StyledButton = styled.button`
  background-color: rgba(114, 137, 218, 0.4);
  border-radius: 14px;
  /* border-radius: ${({ theme }) => theme.layout.borderRadius}; */
  color: ${({ theme }) => theme.layout.text};
  border: 1px solid ${({ theme }) => theme.layout.borderColor};
  font-weight: bold;
  height: 28px;
  padding: 0 1rem;
`

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
  padding: 0 ${({ theme }) => theme.layout.bigPadding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
`
