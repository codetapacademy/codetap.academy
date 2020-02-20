import React from 'react';
import { StyledRangePointer } from './range-pointer.style';

const RangePointer = ({ percentage, onClick }) => {
  return (
    <StyledRangePointer
      className="codetap-academy-pointer-up"
      onClick={onClick}
      percentage={percentage}
    />
  );
};

export default RangePointer;
