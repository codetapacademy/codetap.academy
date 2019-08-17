import React, { useState, useEffect } from 'react';
import TextInput from '../text-input';

const DynamicForm = ({ schema, data, dbItem }) => {
  const [formSchema, setFormSchema] = useState(schema);
  const { formId, filedList } = formSchema;

  useEffect(() => {
    Object.keys(data).map(key => {
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
        case 'string':
          return (
            <TextInput
              key={field}
              id={field}
              formId={formId}
              label={label}
              value={value}
              onEvent={onEvent}
              placeholder={placeholder}
            />
          );
      }
    });

  return <form>{renderForm()}</form>;
};

export default DynamicForm;
