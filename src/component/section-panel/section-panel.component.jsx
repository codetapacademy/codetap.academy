import React, { useState, useEffect } from 'react'
import PanelTitle from '../panel-title';
import { db } from '../data/firebase'
import ManageMeta from '../manage-meta';
import SectionList from '../section-list';
import { WebInfoState } from '../web-info/web-info.context';
import { addSectionAction, removeSectionAction, modifySectionAction, initSectionListAction } from '../course/section.action';

const SectionPanel = ({ course }) => {
  const defaultSection = {
    title: '',
    description: '',
    id: null,
    course,
  }
  const [ section, setSection ] = useState(defaultSection)
  const { sectionList, updateSectionList } = WebInfoState()

  useEffect(() => {
    const sectionCollection = db
      .collection('section')
      .where('course.id', '==', course.id)

    sectionCollection
      .get()
      .then((snapList => {
        const sectionList = snapList.docs.map(d => {
          return {
            id: d.id,
            ...d.data()
          }
        })

        updateSectionList(initSectionListAction(sectionList))
      }))

    return sectionCollection
      .onSnapshot(snapList => {
        snapList.docChanges().forEach(change => {
          const section = change.doc.data()
          if (change.type === 'added' && change.doc.metadata.hasPendingWrites) {
            updateSectionList(addSectionAction({
              title: section.title,
              description: section.description,
              id: change.doc.id,
            }))
          }
          else if (change.type === 'removed') {
            updateSectionList(removeSectionAction({
              id: change.doc.id,
            }))
          }
          else if (change.type === 'modified') {
            updateSectionList(modifySectionAction({
              title: section.title,
              description: section.description,
              id: change.doc.id,
            }))
            // setSectionIdToEdit(null)
          }
        })
      })
  }, [])

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

  const getUpdateValue = (list, updateId) => {
    return list
      .filter(({ id }) => id === updateId)
      .map(({ title, description }) => ({ title, description }))[0] || {}
  }

  const handleUpdate = id => {
    const { title, description } = getUpdateValue(sectionList, id)
    setSection({ ...section, id, title, description })
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
      <SectionList
        data={sectionList}
        course={course}
        handleUpdate={handleUpdate}
      />

    </div>
  )
}

export default SectionPanel
