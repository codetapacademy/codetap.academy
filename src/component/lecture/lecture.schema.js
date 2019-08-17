export default {
  formId: 'lecture',
  filedList: {
    title: {
      type: 'string',
      placeholder: 'Change title',
      label: 'Title',
      defaultValue: '',
      edit: true,
      visible: true,
      value: ''
    },
    description: {
      type: 'string',
      placeholder: 'Change description',
      label: 'Description',
      defaultValue: '',
      edit: true,
      visible: true,
      value: ''
    },
    published: {
      type: 'boolean',
      placeholder: 'toggle the publish status',
      label: 'Is the lecture avaialable to see?',
      defaultValue: false,
      edit: true,
      visible: true,
      value: false
    },
    order: {
      type: 'number',
      defaultValue: 0,
      edit: false,
      visible: false,
      value: 0
    },
    youtubeVideoId: {
      type: 'string',
      placeholder: 'Change YouTube Video Id',
      label: 'YouTube Video Id',
      defaultValue: '',
      edit: true,
      visible: true,
      value: ''
    }
  }
};
