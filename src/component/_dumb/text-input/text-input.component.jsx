import React from 'react';
import { StyledTextInput, StyledTextLabel, StyledTextWrapper } from './text-input.style';

const TextInput = ({ id, formId, value, onEvent, placeholder, label, type = 'text', step }) => {
  const handleOnChange = e => onEvent(e.target.value, id, 'change');
  const handleOnBlur = e => onEvent(e.target.value, id, 'blur');
  const styledTextInputPropList = {
    placeholder,
    id: `${formId}--${id}`,
    type,
    value,
    onChange: handleOnChange,
    onBlur: handleOnBlur,
  }

  if (step) {
    styledTextInputPropList.step = step
  }

  return (
    <StyledTextWrapper>
      <StyledTextLabel htmlFor={`${formId}--${id}`}>{label}</StyledTextLabel>
      <StyledTextInput {...styledTextInputPropList} />
    </StyledTextWrapper>
  );
};

export default TextInput;
