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
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.layout.borderColor};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`


