import React, { useEffect, useState } from 'react'
import { WebInfoState } from '../web-info/web-info.context';
import { db } from '../data/firebase'
import PanelTitle from '../panel-title';
import ManageTitleAndDescription from '../manage-title-and-description/manage-title-and-description.component';

const Course = ({ courseId }) => {
  const { sectionList } = WebInfoState()
  const [ sectionIdToEdit, setSectionIdToEdit ] = useState(null)
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')

  useEffect(() => {
    // sectionList
    //   .filter(course => course.id === courseId)
    //   .forEach(({ title, description }) => {
    //     setDescription(description)
    //     setTitle(title)
    //   })
  }, [])

  const addSection = () => {
    const collection = db.collection('section')
    if (sectionIdToEdit) {
      // it means we want to update a section
      collection.doc(sectionIdToEdit).set(
        { title, description, courseId },
        { merge: true }
      )
    }
    else {
      // we want to add a section
      collection.add({ title, description })
    }
    setTitle('')
    setDescription('')
  }

  const handleTitle = e => {
    let value = ''
    if (e.target.value) {
      value = e.target.value
    }
    else {
      setSectionIdToEdit(null)
    }
    setTitle(value)
  }

  const handleDescription = e => {
    const { value } = e.target
    setDescription(value)
  }

  return (
    <div>
      <PanelTitle>{title}</PanelTitle>
      <p>{description}</p>
      <PanelTitle>Add section</PanelTitle>
      <ManageTitleAndDescription
        addToDb={addSection}
        title={title}
        saveLabel="Save section"
        addLabel="Add Section"
        handleTitle={handleTitle}
        handleDescription={handleDescription}
      />
    </div>
  )
}

export default Course
