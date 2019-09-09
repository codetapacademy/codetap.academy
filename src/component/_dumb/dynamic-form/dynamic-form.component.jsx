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
      const { type, value, placeholder, label } = filedList[field];
      switch (type) {
        case 'text':
        case 'date':
        case 'datetime-local':
          return (
            <TextInput
              key={field}
              id={field}
              type={type}
              formId={formId}
              label={label}
              value={value}
              onEvent={onEvent}
              placeholder={placeholder}
            />
          );
        default:
          return null
      }
    });

  return <form>{renderForm()}</form>;
};

export default DynamicForm;
