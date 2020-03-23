import React, { useState } from 'react'
import { db } from '../data/firebase'
import ManageMeta from '../manage-meta';
import SectionList from '../section-list';
import { WebInfoState } from '../web-info/web-info.context';
import HeaderTitle from '../_dumb/header-title/header-title.component';
import { getAddSectionTitlePropList, getManageSectionTitlePropList, getDefaultSection } from './section-panel.config';

const SectionPanel = ({ course, showHeader }) => {
  const defaultSection = getDefaultSection(course)

  const [section, setSection] = useState(defaultSection)
  const { sectionList } = WebInfoState()

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
      const order = sectionList.length
      sectionCollection.add({ title, description, course, order })
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

  const addSectionTitlePropList = getAddSectionTitlePropList()
  const manageSectionTitlePropList = getManageSectionTitlePropList()

  return (
    <div>
      {showHeader && <div>
        <HeaderTitle {...addSectionTitlePropList} />
        <ManageMeta
          label={getSaveLabel()}
          save={save}
          change={change}
          cancel={cancel}
          data={section}
        />

        <HeaderTitle {...addSectionTitlePropList} />
      </div>}
      <SectionList
        data={sectionList}
        course={course}
        handleUpdate={handleUpdate}
      />

    </div>
  )
}

export default SectionPanel
