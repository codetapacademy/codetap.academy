import styled from 'styled-components'

export const StyledTitle = styled.div`
  padding: 0.5rem 1rem;
  background-color: #f1f1f1;
`

export const StyledDescription = styled.div`
  padding: 0.5rem 1rem;
`

export const StyledCourseItem = styled.div`
  width: 250px;
  height: 500px;
  border-radius: 0.5rem;
  border: 1px solid #f1f1f1;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const StyledButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  right: -100%;
  top: 0;
  transition: 0.25s;

  ${StyledCourseItem}:hover & {
    right: 0;
  }
`

