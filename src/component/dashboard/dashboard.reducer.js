import {
  ADD_COURSE,
  REMOVE_COURSE,
  MODIFY_COURSE,
  INIT_COURSE_LIST,
} from './dashboard.const'


export const courseListReducer = (state = [], action) => {
  switch(action.type) {
    case INIT_COURSE_LIST:
      return [
        ...action
          .courseList
          .map((course, order) => ({ order, ...course }))
      ]
    case ADD_COURSE:
      return [
        ...state,
        {
          title: action.course.title,
          description: action.course.description,
          id: action.course.id
        }
      ]
    case REMOVE_COURSE:
      return state.filter(course => course.id !== action.course.id)
    case MODIFY_COURSE:
      return state.map(course => course.id === action.course.id
        ? action.course
        : course
      )
    default:
      return state
  }
}
