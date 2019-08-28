import styled from 'styled-components'

const StyledCommentSection = styled.div`
  margin: 10px 10px;
  display: flex;
`
const StyledTextArea = styled.textarea`
  width: 80%;
  margin-right: 10px;
  border-radius: 5px;
`

const StyledButton = styled.button`
  width: 80px; 
  max-height: 50px;
  border-radius: 5px;
  background: linear-gradient(to bottom, #a90329 0%,#d52027 39%,#6d0019 100%);
  color: white;
  border: none;
`

export { StyledButton, StyledTextArea, StyledCommentSection} 