import React, { useState, useEffect } from 'react'
import {
  addCourseAction,
  removeCourseAction,
  modifyCourseAction,
  initCourseListAction,
} from './dashboard.action'
import { db } from '../data/firebase'
import CourseList from '../course-list/course-list.component'
import ManageMeta from '../manage-meta/manage-meta.component'
import { navigate } from '@reach/router'
import { StyledControlPanel } from './dashboard.style';
import { WebInfoState } from '../web-info/web-info.context'
import HeaderTitle from '../_dumb/header-title/header-title.component';

const Dashboard = () => {
  const defaultCourse = {
    title: '',
    description: '',
    id: null,
  }
  const [course, setCourse] = useState(defaultCourse)
  const { courseList, updateCourseList } = WebInfoState()
  const courseCollection = db.collection('course')
  useEffect(() => {
    let unsubscribe;

    if (!courseList.length) {
      (async () => {
        // I want to get a list of courses from FireStore

        try {
          const snapList = await courseCollection
            .orderBy('order', 'asc')
            .get()
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
        } catch (e) {
          console.error('getCourseCollection() failed!', e)
        }
      })()
    }

    return unsubscribe
  }, [])

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

  const addCourseTitlePropList = {
    text: 'Add Course',
    tag: 'h1',
    fontSize: '22px',
  }

  const manageCourseTitlePropList = {
    text: 'Manage Course',
    tag: 'h1',
    fontSize: '22px',
  }

  const updateOrder = (a, b) => {
    const list = [...courseList]
    const [ first ] = list.splice(a, 1)
    list
      .splice(b, 0, first)
      
    const batch = db.batch()
    list
      .map((o, order) => ({ ...o, order}))
      .forEach(({ id, order }) => {
        batch.set(
          courseCollection.doc(id),
          { order },
          { merge: true }
        )
      })
    batch.commit().then(r => {
      updateCourseList(initCourseListAction(list))
    })
  }

  return (
    <StyledControlPanel>
      <HeaderTitle {...addCourseTitlePropList} />
      <ManageMeta
        label={getSaveLabel()}
        save={save}
        change={change}
        cancel={cancel}
        data={course}
      />

      <HeaderTitle {...manageCourseTitlePropList} />
      <CourseList
        courseList={courseList}
        goToCourse={goToCourse}
        updateOrder={updateOrder}
      />
    </StyledControlPanel>
  )
}

export default Dashboard
