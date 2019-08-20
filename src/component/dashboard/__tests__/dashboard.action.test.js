import { ADD_COURSE, REMOVE_COURSE, MODIFY_COURSE } from "../course-panel.const";
import { addCourseAction, removeCourseAction, modifyCourseAction } from "../course-panel.action";

describe('@Course Panel Action', () => {
  it('should create an action that adds a course', () => {
    const course = {
      id: 'testDeId',
      courseTitle: 'titleTest'
    }
    const expected = {
      type: ADD_COURSE,
      course
    }
    const result = addCourseAction(course)
    expect(result).toEqual(expected)
  })

  it('should create an action that removes a course', () => {
    const course = {
      id: 'testCornel'
    }
    const expected = {
      type: REMOVE_COURSE,
      course
    }

    const result = removeCourseAction(course)
    expect(result).toEqual(expected)
  })

  it('should create a modified action', () => {
    const course = {
      id: 'ce vreau eu',
      courseTitle: 'tot ce vreau eu'
    }
    const expected = {
      type: MODIFY_COURSE,
      course
    }
    const result = modifyCourseAction(course);
    expect(result).toEqual(expected)
  })
})
