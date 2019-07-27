import React, { useState, useEffect } from 'react'
import {
  addCourseAction,
  removeCourseAction,
  modifyCourseAction,
  initCourseListAction,
} from '../course-panel/course-panel.action'
import { db } from '../data/firebase'
import CourseList from '../course-list/course-list.component'
import ManageMeta from '../manage-meta/manage-meta.component'
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
  const { courseList, updateCourseList } = WebInfoState()
  useEffect(() => {
    let unsubscribe;

    (async () => {
      // I want to get a list of courses from FireStore
      const courseCollection = db
        .collection('course')
  
      try {
        const snapList = await courseCollection.get()
        const courseList = snapList.docs.map(d => {
          return {
            id: d.id,
            ...d.data()
          }
        })

        updateCourseList(initCourseListAction(courseList))

        unsubscribe = await courseCollection
          .onSnapshot(snapList => {
            snapList.docChanges().forEach(change => {
              const course = change.doc.data()

              if (change.type === 'added' && change.doc.metadata.hasPendingWrites) {
                updateCourseList(addCourseAction({
                  title: course.title,
                  description: course.description,
                  id: change.doc.id,
                }))
              }
              else if (change.type === 'removed') {
                updateCourseList(removeCourseAction({
                  id: change.doc.id,
                }))
              }
              else if (change.type === 'modified') {
                updateCourseList(modifyCourseAction({
                  title: course.title,
                  description: course.description,
                  id: change.doc.id,
                }))
                // setCourseIdToEdit(null)
              }
            })
          })
      } catch(e) {
        console.error('getCourseCollection() failed!', e)
      }
    })()

    return unsubscribe
  }, [])

  const deleteItem = id => {
    (async () => {
      try {
        await db
          .collection('course')
          .doc(id)
          .delete()
      } catch (message) {
        console.log(`Weird message!`, message)
      }
    })()
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
    navigate(`/course/${id}`)
  }

  const getSaveLabel = () => course.id ? "Update course" : "Add course"

  return (
    <StyledControlPanel>
      <PanelTitle>Add Course</PanelTitle>
      <ManageMeta
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
