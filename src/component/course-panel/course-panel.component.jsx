import React, { useState } from 'react'
import { db } from '../data/firebase'
import CourseList from '../course-list/course-list.component'
import ManageTitleAndDescription from '../manage-meta/manage-meta.component'
import { navigate } from '@reach/router'
import { StyledControlPanel } from './course-panel.style';
import { WebInfoState } from '../web-info/web-info.context'
import PanelTitle from '../panel-title';

const CoursePanel = () => {
  const defaultCourse = {
    title: '',
    description: '',
    id: null,
  }
  const [ course, setCourse ] = useState(defaultCourse)
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

  const save = () => {
    const courseCollection = db.collection('course')
    const { id, title, description } = course
    if (id) {
      // it means we want to update a course
      courseCollection.doc(id).set(
        { title, description },
        { merge: true }
      )
    }
    else {
      // we want to add a course
      courseCollection.add({ title, description })
    }
    setCourse(defaultCourse)
  }

  const getUpdateValue = (list, updateId) => {
    return list
      .filter(({ id }) => id === updateId)
      .map(({ title, description }) => ({ title, description }))[0] || {}
  }

  const handleUpdate = id => {
    const { title, description } = getUpdateValue(courseList, id)
    setCourse({ id, title, description })
  }

  const change = what => {
    setCourse({ ...course, ...what })
  }

  const cancel = () => {
    setCourse(defaultCourse)
  }

  const goToCourse = id => {
    console.log(`Go to course with id: ${id}`)
    navigate(`/course/${id}`)
  }

  const getSaveLabel = () => course.id ? "Update course" : "Add course"

  return (
    <StyledControlPanel>
      <PanelTitle>Add Course</PanelTitle>
      <ManageTitleAndDescription
        label={getSaveLabel()}
        save={save}
        change={change}
        cancel={cancel}
        data={course}
      />
      <PanelTitle>Manage course</PanelTitle>
      <CourseList
        courseList={courseList}
        handleUpdate={handleUpdate}
        deleteItem={deleteItem}
        goToCourse={goToCourse}
      />
    </StyledControlPanel>
  )
}

export default CoursePanel
