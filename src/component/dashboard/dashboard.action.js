import {
  ADD_COURSE,
  REMOVE_COURSE,
  MODIFY_COURSE,
  INIT_COURSE_LIST,
} from './dashboard.const'

export const initCourseListAction = courseList => ({
  type: INIT_COURSE_LIST,
  courseList,
})

export const addCourseAction = course => ({
  type: ADD_COURSE,
  course,
})

export const removeCourseAction = course => ({
  type: REMOVE_COURSE,
  course,
})

export const modifyCourseAction = course => ({
  type: MODIFY_COURSE,
  course,
})
