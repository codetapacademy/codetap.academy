import React from 'react'

const SelectInput = ({ type, value, placeholder, label, visible, step, optionList, onEvent, id }) => {
  const handleOnChange = e => onEvent(e.target.value, id, 'change');
  const handleOnBlur = e => onEvent(e.target.value, id, 'blur');
  return (
    <div>
      <label htmlFor="">{label}</label>
      <select
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      >
        {optionList.map(option => {
          return (
            <option value={option}>{option}</option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectInput
