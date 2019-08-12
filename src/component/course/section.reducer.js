import {
  ADD_SECTION,
  REMOVE_SECTION,
  MODIFY_SECTION,
  INIT_SECTION_LIST,
  ADD_LECTURE_TO_SECTION,
  REMOVE_LECTURE_FROM_SECTION
} from './section.const'


export const sectionListReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_SECTION_LIST:
      return [
        ...action.sectionList
      ]
    case ADD_SECTION:
      return [
        ...state,
        {
          title: action.section.title,
          description: action.section.description,
          id: action.section.id
        }
      ]
    case ADD_LECTURE_TO_SECTION:
      return state
        .map(section => section.id === action.lecture.section.id
          ? ({ ...section, lectureList: [...(section && section.lectureList || []), action.lecture] })
          : section
        )
    case REMOVE_LECTURE_FROM_SECTION:
      return state
        .map(section => section.id === action.sectionId
          ? ({ ...section, lectureList: section.lectureList.filter(({ id }) => id !== action.id) })
          : section
        )
    case REMOVE_SECTION:
      return state.filter(section => section.id !== action.section.id)
    case MODIFY_SECTION:
      return state.map(section => section.id === action.section.id
        ? action.section
        : section
      )
    default:
      return state
  }
}
