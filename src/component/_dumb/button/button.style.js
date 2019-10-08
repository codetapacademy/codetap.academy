import styled from 'styled-components'

export const StyledButton = styled.button`
  background-color: ${({ theme, color }) => theme.colorList[color] || 'primary'};
  color: white;
  border: 0;
  line-height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: bold;
`
