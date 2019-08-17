import styled from 'styled-components';
import { createElement } from 'react';

const wrapTitle = Component => {
  const DynamicTag = ({ tag, children, ...propList }) => {
    return createElement(Component.withComponent(tag), propList, children);
  };

  return DynamicTag;
};

export const StyledTitle = styled.h1`
  margin: 0;
  font-size: ${({ fontSize }) => fontSize};
  color: white;
`;

export const DynamicStyledTitle = wrapTitle(StyledTitle);
