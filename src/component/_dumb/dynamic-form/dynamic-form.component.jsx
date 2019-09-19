import React, { useState, useEffect } from 'react';
import TextInput from '../text-input';

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
      const { type, value, placeholder, label, visible, step } = filedList[field];
      const textInputPropList = {
        key: field,
        id: field,
        type,
        formId,
        label,
        value,
        onEvent,
        placeholder,
        step,
      }

      if (visible) {
        switch (type) {
          case 'text':
          case 'time':
          case 'date':
          case 'number':
          case 'datetime-local':
            return (
              <TextInput {...textInputPropList} />
            );
          default:
            return null
        }
      }
    });

  return <form>{renderForm()}</form>;
};

export default DynamicForm;
