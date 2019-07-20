import React, { useState } from 'react'
import { db } from '../data/firebase'
import CourseList from '../course-list/course-list.component'
import CourseEdit from '../course-edit/course-edit.component'
import { navigate } from '@reach/router'
import { StyledControlPanel, StyledPanelTitle } from './course-panel.style';
import { WebInfoState } from '../web-info/web-info.context'

const CoursePanel = () => {
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('change me!!! :p sa nu moarahhh gigi')
  const [ courseIdToEdit, setCourseIdToEdit ] = useState(null)
  const [ editInputUpdated, setEditInputUpdated ] = useState(false)
  const { courseList } = WebInfoState()

  const deleteItem = id => {
    db
      .collection('course')
      .doc(id)
      // TODO, mark as deleted and never delete
      // some other logic should display data only if not marked as deleted
      .delete()
      .then(aaa => {
        // console.log(`Item with id: ${id} is no longer with us`, aaa)
      })
      .catch(message => console.log(`Weird message!`, message))
  }

  const addCourse = () => {
    const courseCollection = db.collection('course')
    if (courseIdToEdit) {
      // it means we want to update a course
      courseCollection.doc(courseIdToEdit).set(
        { title, description },
        { merge: true }
      )
    }
    else {
      // we want to add a course
      courseCollection.add({ title, description })
    }
    setTitle('')
    setDescription('')
  }

  const getCourseToEdit = (courseList, courseToEdit) => {
    setEditInputUpdated(false)
    return courseList
      .filter(({ id }) => id === courseToEdit)
      .map(({ title, description }) => ({ title, description }))[0] || {}
  }

  const courseEditValue = editInputUpdated
    // get the course title value from the list
    ? getCourseToEdit(courseList, courseIdToEdit)
    // the value from the input or empty string
    : { title, description }

  const handleCourseToEdit = courseId => {
    setEditInputUpdated(true)
    setCourseIdToEdit(courseId)
    const { title, description } = getCourseToEdit(courseList, courseId)
    setTitle(title)
    setDescription(description)
  }

  const handleTitle = e => {
    let value = ''
    if (e.target.value) {
      value = e.target.value
    }
    else {
      setCourseIdToEdit(null)
    }
    setTitle(value)
  }
  
  const handleCancel = () => {
    setCourseIdToEdit(null)
    setTitle('')
    setDescription('')
  }

  const handleDescription = e => {
    const { value } = e.target
    setDescription(value)
  }

  const goToCourse = id => {
    console.log(`Go to course with id: ${id}`)
    navigate(`/course/${id}`)
  }

  return (
    <StyledControlPanel>
      <StyledPanelTitle>Add Course</StyledPanelTitle>
      <CourseEdit
        addCourse={addCourse}
        handleTitle={handleTitle}
        handleCancel={handleCancel}
        courseIdToEdit={courseIdToEdit}
        description={courseEditValue.description}
        handleDescription={handleDescription}
        title={courseEditValue.title}
      />
      <StyledPanelTitle>Manage course</StyledPanelTitle>
      <CourseList
        courseList={courseList}
        handleCourseToEdit={handleCourseToEdit}
        deleteItem={deleteItem}
        goToCourse={goToCourse}
      />
    </StyledControlPanel>
  )
}

export default CoursePanel
