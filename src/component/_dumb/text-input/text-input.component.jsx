import React from 'react';
import { StyledTextInput, StyledTextLabel, StyledTextWrapper } from './text-input.style';

const TextInput = ({ id, formId, value, onEvent, placeholder, label }) => {
  const handleOnChange = e => onEvent(e.target.value, id, 'change');
  const handleOnBlur = e => onEvent(e.target.value, id, 'blur');

  return (
    <StyledTextWrapper>
      <StyledTextLabel htmlFor={`${formId}--${id}`}>{label}</StyledTextLabel>
      <StyledTextInput
        placeholder={placeholder}
        id={`${formId}--${id}`}
        type="text"
        value={value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    </StyledTextWrapper>
  );
};

export default TextInput;
