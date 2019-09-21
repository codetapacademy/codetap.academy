import React, { useState, useEffect } from 'react';
import TextInput from '../text-input';
import SelectInput from '../select-input/select-input.component';

const DynamicForm = ({ schema, data, dbItem }) => {
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

  const onEvent = (value, field, type) => {
    console.log(value, field, type)
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
      const { type, value, placeholder, defaultValue, label, visible, step, optionList = [] } = filedList[field];
      const inputPropList = {
        key: field,
        id: field,
        type,
        formId,
        label,
        value,
        onEvent,
        placeholder,
        step,
        optionList,
        defaultValue,
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
            return <SelectInput {...inputPropList} />
          default:
            return null
        }
      }
    });

  return <form>{renderForm()}</form>;
};

export default DynamicForm;
