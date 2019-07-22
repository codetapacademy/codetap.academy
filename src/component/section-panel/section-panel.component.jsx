import React, { useState } from 'react'
import PanelTitle from '../panel-title';
import { db } from '../data/firebase'
import ManageMeta from '../manage-meta';
import SectionList from '../section-list';
import { WebInfoState } from '../web-info/web-info.context';

const SectionPanel = ({ course }) => {
  const defaultSection = {
    title: '',
    description: '',
    id: null,
    course,
  }
  const { sectionList } = WebInfoState()
  const [ section, setSection ] = useState(defaultSection)
  console.log(sectionList)

  const change = what => {
    setSection({ ...section, ...what })
  }

  const save = () => {
    const sectionCollection = db.collection('section')
    const { id, title, description } = section
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

  const cancel = () => {
    setSection(defaultSection)
  }

  const getSaveLabel = () => section.id ? "Update section" : "Add section"

  return (
    <div>
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

export default SectionPanel
