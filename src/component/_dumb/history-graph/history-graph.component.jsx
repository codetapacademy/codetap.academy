import React from 'react';
import { StyledHistoryGraph } from './history-graph.style';

const HistoryGraph = ({ data = {}, height }) => {
  const colorList = ['transparent', '#0f0', '#02f', '#cf0', '#c00'];

  const getColor = i => (i < colorList.length ? colorList[i] : colorList[colorList.length - 1]);

  const getLinearGradient = () => {
    const objectKeys = Object.keys(data);
    const percentageUnit = 100 / objectKeys.length;
    return objectKeys.map(k => `${getColor(data[k])} ${k * percentageUnit}%`).join(', ');
  };
  return <StyledHistoryGraph height={height} gradient={() => getLinearGradient()} />;
};

export { HistoryGraph };
