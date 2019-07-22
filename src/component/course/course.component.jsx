import React, { useEffect, useState } from 'react'
import { WebInfoState } from '../web-info/web-info.context';
import { db } from '../data/firebase'
import PanelTitle from '../panel-title';
import ManageMeta from '../manage-meta';
import SectionList from '../section-list';

const Section = ({ courseId }) => {
  const defaultSection = {
    title: '',
    description: '',
    id: null,
    course: {
      id: courseId,
      title: 'Course '
    },
  }
  const { sectionList, courseList } = WebInfoState()
  const [ section, setSection ] = useState(defaultSection)
  console.log(sectionList)

  useEffect(() => {
    // sectionList
    //   .filter(Section => Section.id === SectionId)
    //   .forEach(({ title, description }) => {
    //     setDescription(description)
    //     setTitle(title)
    //   })
    const course = courseList.filter(({ id }) => id === courseId)[0]
    if (course && courseList.length) {
      setSection({
        ...section,
        course,
      })
    }
  }, [courseList])

  const save = () => {
    const sectionCollection = db.collection('section')
    const { id, title, description, course } = section
    if (id) {
      // it means we want to update a Section
      sectionCollection.doc(id).set(
        { title, description, course },
        { merge: true }
      )
    }
    else {
      // we want to add a Section
      sectionCollection.add({ title, description, course })
    }
    setSection(defaultSection)
  }

  const change = what => {
    setSection({ ...section, ...what })
  }

  const cancel = () => {
    setSection(defaultSection)
  }

  const getSaveLabel = () => section.id ? "Update section" : "Add section"

  return (
    <div>
      <PanelTitle>{section.course.title}</PanelTitle>
      <p>{section.course.description}</p>
      <PanelTitle>Add section</PanelTitle>
      <ManageMeta
        label={getSaveLabel()}
        save={save}
        change={change}
        cancel={cancel}
        data={section}
      />
      <PanelTitle>Manage section</PanelTitle>
      <SectionList data={sectionList} />
    </div>
  )
}

export default Section
