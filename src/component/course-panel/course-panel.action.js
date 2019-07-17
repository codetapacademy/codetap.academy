import { ADD_COURSE, REMOVE_COURSE, MODIFY_COURSE } from './course-panel.const'

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
