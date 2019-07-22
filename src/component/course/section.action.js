import {
  ADD_SECTION,
  REMOVE_SECTION,
  MODIFY_SECTION,
  INIT_SECTION_LIST
} from './section.const'

export const initSectionListAction = sectionList => ({
  type: INIT_SECTION_LIST,
  sectionList,
})

export const addSectionAction = section => ({
  type: ADD_SECTION,
  section,
})

export const removeSectionAction = section => ({
  type: REMOVE_SECTION,
  section,
})

export const modifySectionAction = section => ({
  type: MODIFY_SECTION,
  section,
})
