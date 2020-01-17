import styled from 'styled-components'

export const StyledHistoryGraph = styled.div`
  height: ${({ height }) => `${height}px` || '5px'};
  background: linear-gradient(to right, ${({ gradient }) => gradient});
  overflow: hidden;
  position: absolute;
  width: 100%;
  left: 0%;
  bottom: ${({ height }) => `-${height}px` || '-5px'};
`
