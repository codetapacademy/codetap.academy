export default {
  formId: 'course',
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
      type: 'string',
      placeholder: 'Change YouTube Playlist Id',
      label: 'YouTube Playlist Id',
      defaultValue: '',
      edit: true,
      visible: true,
      value: ''
    }
  }
};
