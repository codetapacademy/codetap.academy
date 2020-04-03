import styled from 'styled-components'
import { Link } from '@reach/router';

export const StyledCopyButton = styled.button`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
`

export const StyledHiddenTextarea = styled.textarea`
  position: fixed;
  top: 0;
  left: -1000px;
`

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`

export const StyledLectureItem = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(6, auto);
  grid-gap: 1rem;
  background-color:  ${({ theme }) => `${theme.menu.background}`};
  padding: ${({ theme }) => `${theme.layout.defaultPadding} ${theme.layout.bigPadding}`};
`
