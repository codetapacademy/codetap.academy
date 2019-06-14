import styled from 'styled-components'

export const StyledApp = styled.div`
  background-color: #dfdfdf;
  background-image: linear-gradient(180deg,#dddbd1,#d2dbdc);

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background-color: #009688;
  }
`