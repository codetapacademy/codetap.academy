import {
  ADD_SECTION,
  REMOVE_SECTION,
  MODIFY_SECTION,
  INIT_SECTION_LIST,
  ADD_LECTURE_TO_SECTION
} from './section.const'

export const initSectionListAction = sectionList => ({
  type: INIT_SECTION_LIST,
  sectionList,
})

export const addLectureToSectionAction = lecture => ({
  type: ADD_LECTURE_TO_SECTION,
  lecture,
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
