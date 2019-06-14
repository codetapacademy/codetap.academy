import styled from 'styled-components'

export const StyledApp = styled.div`
  background-color: #dfdfdf;
  background-image: linear-gradient(180deg,#dddbd1,#d2dbdc);

  ::before {
    position: fixed;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background-color: #d52027;
  }
`