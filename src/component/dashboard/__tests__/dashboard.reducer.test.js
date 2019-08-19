import { addCourseAction, removeCourseAction, modifyCourseAction } from "../course-panel.action";
import { courseListReducer } from "../course-panel.reducer";

describe('@course panel reducer', () => {
  it('should add a course to the state', () => {
    const state = []
    const course = {
      id: 'super smecherie',
      title: 'Testing is fun until it gets ugly'
    }
    const action = addCourseAction(course)

    const expected = [ course ]

    const result = courseListReducer(state, action)
    expect(result).toEqual(expected)
  })

  it('should delete a course', () => {
    const state = [
      {
        id: 'cornel',
        title: 'codeTap'
      },
      {
        id: 'cristian',
        title: 'coding'
      },
    ]
    const action = removeCourseAction({ id: 'cornel' })

    const expected = [
      {
        id: 'cristian',
        title: 'coding'
      },
    ]

    const result = courseListReducer(state, action)
    expect(result).toEqual(expected)
  })

  it('should update the course', () => {
    const state = [
      {
        id: 'cornel',
        title: 'codeTap'
      },
      {
        id: 'un id',
        title: 'un titlu'
      },
      {
        id: 'cristian',
        title: 'coding'
      },
    ]

    const course = {
      id: 'un id',
      title: 'super titlu'
    }

    const action = modifyCourseAction(course)

    const expected = [
      {
        id: 'cornel',
        title: 'codeTap'
      },
      {
        id: 'un id',
        title: 'super titlu'
      },
      {
        id: 'cristian',
        title: 'coding'
      },
    ]
    const result = courseListReducer(state, action);
    expect(result).toEqual(expected)
  })
})