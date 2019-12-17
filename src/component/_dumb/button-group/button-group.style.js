import styled from 'styled-components'

export const StyledButtonGroup = styled.div`
  & > button:first-child {
    margin-left: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & > button:not(:first-child):not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & > button:not(:first-child) {
    margin-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    position: relative;
    border-left: 1px solid rgba(255, 255, 255, 0.25);
  }
`
