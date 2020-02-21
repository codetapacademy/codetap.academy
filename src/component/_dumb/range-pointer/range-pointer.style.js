import styled from 'styled-components';

export const StyledRangePointer = styled.div`
  position: absolute;
  bottom: -28px;
  width: 5px;
  height: 18px;
  left: calc(${({ percentage }) => percentage * 100}% - 8px);
  cursor: pointer;
  transition: 250ms;

  &:hover {
    color: #d52027;
  }
`;
