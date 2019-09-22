export default {
  formId: 'course',
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
    courseLevel: {
      type: 'select',
      placeholder: 'Select difficulty',
      label: 'Level of knowledge required to uderstand the course',
      defaultValue: {
        label: 'starter',
        value: 'starter'
      },
      options: [{
          label: 'starter',
          value: 'starter'
        },
        {
          label: 'junior',
          value: 'junior'
        },
        {
          label: 'mid',
          value: 'mid'
        },
        {
          label: 'senior',
          value: 'senior'
        },
      ],
      edit: true,
      visible: true,
      value: ''
    },
    courseAuthorCustom: {
      type: 'select',
      placeholder: 'Select Author',
      label: 'The main author of the course',
      defaultValue: '',
      options: [],
      edit: true,
      visible: true,
      value: ''
    },
    published: {
      type: 'boolean',
      placeholder: 'toggle the publish status',
      label: 'Is the course avaialable to see?',
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
    youtubePlaylistId: {
      type: 'text',
      placeholder: 'Change YouTube Playlist Id',
      label: 'YouTube Playlist Id',
      defaultValue: '',
      edit: true,
      visible: true,
      value: ''
    },
    externalThumbnail: {
      type: 'text',
      placeholder: 'The Picture of the Course',
      label: 'How it looks as the background',
      defaultValue: '',
      edit: true,
      visible: true,
      value: ''
    }
  }
};