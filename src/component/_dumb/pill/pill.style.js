import styled from 'styled-components'

const colorMap = {
  starter: '#c00',
  junior: '#036',
  mid: '#f00',
  senior: '#0f0',
}

export const StyledPillHalf = styled.span`
  flex-basis: 50%;
  padding: 0.2rem 0.5rem;

  &:first-child {
    background-color: #fff;
    color: #000;
  }

  &:last-child {
    background-color: ${({ value }) => colorMap[value]};
    color: #fff;
    text-transform: capitalize;
  }
`

export const StyledPill = styled.span`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  overflow: hidden;
`
