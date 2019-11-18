import styled from 'styled-components'

export const StyledButton = styled.button`
  background-color: ${({ theme, color }) => theme.colorList[color] || 'primary'};
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}`};
  color: white;
  border: 0;
  line-height: 40px;
  padding: 0 1rem;
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  display: inline-flex;
  align-items: center;

  & > [class^="codetap-academy-"] {
    padding-right: 0.5rem;
  }

  &::after {
    transition: 150ms;
    content: attr(title);
    position: absolute;
    left: 0;
    right: 0;
    height: 40px;
  }

  &::before {
    top: 0;
  }

  &::after {
    top: 40px;
    color: ${({ theme, color }) => theme.colorList[color] || 'primary'};
    background-color: #fff;
  }

  &:hover::after {
    top: 0;
  }
`
