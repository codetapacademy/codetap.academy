export const getDefaultSection = course => ({
  title: '',
  description: '',
  id: null,
  course,
})

export const getAddSectionTitlePropList = () => ({
  text: 'Add Section',
  tag: 'h1',
  fontSize: '22px',
})

export const getManageSectionTitlePropList = () => ({
  text: 'Manage Section',
  tag: 'h1',
  fontSize: '22px',
})
