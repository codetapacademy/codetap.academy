import React, { useState, useEffect } from 'react';
import TextInput from '../text-input';
import SelectInput from '../select-input/select-input.component';
import Select, { components } from 'react-select'

const DynamicForm = ({ schema, data, dbItem }) => {
  console.log(schema)
  const [formSchema, setFormSchema] = useState(schema);
  const { formId, filedList } = formSchema;

  useEffect(() => {
    Object.keys(data).forEach(key => {
      if (filedList.hasOwnProperty(key)) {
        filedList[key].value = data[key];
      }
    });

    setFormSchema({ ...formSchema, filedList });
  }, [data]);

  const onChange = (...orice) => {
    let value = ''
    if (typeof orice[0] === 'string') {
      value = orice[0]
    } else {
      value = orice[0].value
    }
    const field = orice[1].name

    onEvent(value, field, 'blur')
  }

  const onEvent = (value, field, type) => {
    console.log(value, field, type, formSchema.filedList[field])
    switch (type) {
      case 'change':
        setFormSchema({
          ...formSchema,
          filedList: {
            ...formSchema.filedList,
            [field]: { ...formSchema.filedList[field], value }
          }
        });
        break;
      case 'blur':
        // udpate database for text
        dbItem.set({ [field]: value }, { merge: true });
        break;
      default:
        return;
    }
  };

  const renderForm = () =>
    Object.keys(filedList).map(field => {
      const { type, options = [], value, placeholder, defaultValue, label, visible, step, getOptionLabel } = filedList[field];
      let inputPropList = {
        key: field,
        id: field,
        type,
        options,
        formId,
        label,
        value,
        onEvent,
        placeholder,
        step,
        defaultValue,
        getOptionLabel,
      }

      console.log(options)

      if (type === 'select') {
        inputPropList = {
          ...inputPropList,
          value: options.filter(option => option.value === value),
          onChange,
          // this is the label part of react select
          components: {
            Control: (propList) => (<div>
              {label}
              <components.Control {...propList} />
            </div>),
            // Option: (propList) => (<div style={{ color: 'black' }}>
            //   Nice option
            //   <components.Option {...propList} />
            // </div>)
          },
          // this is the option in the drop down part in react select
          // getOptionLabel: option => console.log(option) || <div style={{ color: 'red', border: '1px dashed blue' }}>{option.label}</div>,
          // getOptionValue: option => option['id'],
        }
        console.log(filedList[field])
      }

      if (visible) {
        switch (type) {
          case 'text':
          case 'time':
          case 'date':
          case 'number':
          case 'datetime-local':
            return (
              <TextInput {...inputPropList} />
            );
          case 'select':
            return <Select name={field} {...inputPropList} />
          default:
            return null
        }
      }
    });

  return <form>{renderForm()}</form>;
};

export default DynamicForm;
