import styled from 'styled-components'

export const StyledTitle = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.layout.background};
  cursor: pointer;
  text-transform: capitalize;
`

export const StyledDescription = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.layout.backgroundText};
  flex-grow: 1;
  position: relative;
`

export const StyledCourseItem = styled.div`
  height: 180px;
  border-radius: 0.5rem;
  border: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: -100%;
  top: 2.5rem;
  transition: 0.25s;

  ${StyledCourseItem}:hover & {
    right: 5px;
  }
`

