import styled from 'styled-components'

export const StyledDisc = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme, color }) => theme.colorList[color || 'primary']};
  margin-left: ${({ marginLeft }) => marginLeft};
  position: relative;
  cursor: pointer;
  border: 0;
  font-size: 2rem;

  [class^="codetap-academy-"] {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::after {
    content: '';
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    ${({ image }) => image ? `background-image: url('${image}');
    background-size: cover;
    background-position: center center;` : ''}
    
  }
`
