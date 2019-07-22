import { ADD_SECTION, REMOVE_SECTION, MODIFY_SECTION, INIT_SECTION_LIST } from './section.const'


export const sectionListReducer = (state = [], action) => {
  switch(action.type) {
    case INIT_SECTION_LIST:
      return [
        ...state,
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
