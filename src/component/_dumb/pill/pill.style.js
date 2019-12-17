import styled from 'styled-components'

const colorMap = {
  starter: '#c00',
  junior: '#036',
  mid: '#00f',
  senior: '#0f0',
}

export const StyledPillHalf = styled.span`
  flex-basis: 50%;
  padding: 0 1rem;
  line-height: 40px;

  &:first-child {
    /* background-color: #fff;
    color: #000; */
    border-right: 2px solid ${({ theme }) => theme.layout.borderDark};
  }

  &:last-child {
    /* background-color: ${({ value }) => colorMap[value]}; */
    color: #fff;
    text-transform: capitalize;
  }
`

export const StyledPill = styled.span`
  display: flex;
  align-items: center;
  border-radius: 20px;
  height: 40px;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.layout.borderDark};
`
