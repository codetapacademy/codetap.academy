export default {
  formId: 'lecture',
  filedList: {
    title: {
      type: 'text',
      placeholder: 'Change title',
      label: 'Title',
      defaultValue: '',
      edit: true,
      visible: true,
      value: ''
    },
    description: {
      type: 'text',
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
    publishDate: {
      type: 'datetime-local',
      placeholder: 'Set the date when the lecture goes live',
      label: 'Go live date',
      defaultValue: new Date().toJSON().slice(0, 16),
      edit: true,
      visible: true,
      value: false
    },
    duration: {
      type: 'time',
      placeholder: 'How long is the lesson?',
      label: 'Duration of video',
      defaultValue: false,
      edit: true,
      visible: true,
      value: false,
      step: 1,
    },
    levelRequired: {
      type: 'number',
      placeholder: 'Level required to view',
      label: 'Level required to view',
      defaultValue: 0,
      edit: true,
      visible: true,
      value: 0
    },
    order: {
      type: 'number',
      defaultValue: 0,
      edit: false,
      visible: false,
      value: 0
    },
    vimeoVideoId: {
      type: 'text',
      placeholder: 'Change Vimeo Video Id',
      label: 'Vimeo Video Id',
      defaultValue: '',
      edit: true,
      visible: true,
      value: ''
    },
    youtubeVideoId: {
      type: 'text',
      placeholder: 'Change YouTube Video Id',
      label: 'YouTube Video Id',
      defaultValue: '',
      edit: true,
      visible: true,
      value: ''
    }
  }
};