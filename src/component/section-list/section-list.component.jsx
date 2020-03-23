import React, { useState } from 'react'
import { StyledSectionList, StyledSectionItem } from './section-list.style';
import { db, storage } from '../data/firebase'
import SectionItem from '../section-item';
import LecturePanel from '../lecture-panel';
import LectureItem from '../lecture-item/lecture-item.component';
import { removeLectureFromSectionAction, initSectionListAction, modifySectionAction } from '../course/section.action';
import { WebInfoState } from '../web-info/web-info.context';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const SectionList = ({ data = [], handleUpdate, toggleSection, course = {}, hideSectionLectureList }) => {
  const [showAddLectureId, setShowAddLectureId] = useState('nimic')
  const { updateSectionList } = WebInfoState()
  const sectionCollection = db.collection('section')
  const lectureCollection = db.collection('lecture')

  const deleteItem = id => {
    sectionCollection
      .doc(id)
      // TODO, mark as deleted and never delete
      // some other logic should display data only if not marked as deleted
      .delete()
      .then(aaa => {
        console.log(`Item with id: ${id} is no longer with us`, aaa)
      })
      .catch(message => console.log(`Weird message!`, message))
  }

  const deleteLectureItem = (id, sectionId) => {
    db
      .collection('lecture')
      .doc(id)
      .delete()
      .then(aaa => {
        console.log(`Item with id: ${id} is no longer with us`, aaa)
        updateSectionList(removeLectureFromSectionAction(id, sectionId))
        // remove image if it exists
        storage
          .ref("lecture-picture")
          .child(id)
          .delete()
        // .then(console.log)
        // .catch(console.log)

      })
    // .catch(message => console.log(`Weird message!`, message))
  }

  const renderLectureList = (lectureList, sectionId) => {
    return (
      <Droppable droppableId={`list-${sectionId}`} type="lecture">
        {(droppableProvided) => (
          <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>

            {(lectureList || []).map((lecture, index) => {
              return (
                <Draggable key={lecture.id} draggableId={lecture.id} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <LectureItem
                        key={lecture.id}
                        {...lecture}
                        sectionId={sectionId}
                        remove={deleteLectureItem}
                      />
                    </div>
                  )}
                </Draggable>
              )
            })}

            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    )
  }

  const updateOrderSection = (a, b) => {
    const list = [...data]
    const [first] = list.splice(a, 1)
    list
      .splice(b, 0, first)

    const batch = db.batch()
    list
      .map((o, order) => ({ ...o, order }))
      .forEach(({ id, order }) => {
        batch.set(
          sectionCollection.doc(id),
          { order },
          { merge: true }
        )
      })
    batch.commit().then(r => {
      updateSectionList(initSectionListAction(list))
    })
  }


  const updateOrderLecture = (a, b) => {
    const batch = db.batch()
    // console.log(a, b)
    if (a.droppableId === b.droppableId) {
      // it is reordering lectures in the same section
      const listId = a.droppableId.slice(5)
      const section = data.find(d => d.id === listId)
      const { lectureList } = section
      // console.log('it is reordering lectures in the same section', lectureList);
      const list = [...lectureList]
      const [first] = list.splice(a.index, 1)
      list.splice(b.index, 0, first)
      // console.log(list);

      list
        .forEach(({ id }, order) => {
          batch.set(
            lectureCollection.doc(id),
            { order },
            { merge: true }
          )
        })
      batch.commit().then(r => {
        section.lectureList = list.map((o, order) => ({ ...o, order }))
        updateSectionList(modifySectionAction(section))
      })
    } else {
      // reordering lectures from different sections
      // console.log('reordering lectures from different sections')
    }
  }

  const onDragEnd = ({ destination, source }) => {
    if (!destination || destination.index === source.index) return
    if (source.droppableId.slice(0, 7) === 'section') {
      // drag and drop section
      updateOrderSection(source.index, destination.index)
    } else {
      // drag and drop lecture
      updateOrderLecture(source, destination)
    }
  }
  // console.log(data)

  return (
    <StyledSectionList>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.map(({ title, description, id, lectureList, hideSectionLectureList }, index) => {
          const lectureListLength = lectureList && lectureList.length || 0
          const section = { title, description, id, }
          const sectionItemPropList = { ...section, showAddLectureId, setShowAddLectureId, deleteItem, handleUpdate, toggleSection }
          const lecturePanelPropList = { section, course, showAddLectureId, setShowAddLectureId, lectureListLength }
          const showLecturelist = lectureList && lectureList.length || null

          return (
            <Droppable
              droppableId={`section-${section.id}`}
              isCombineEnabled={true}
              type="section"
              key={section.id}>
              {(droppableProvided) => (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                >
                  <Draggable draggableId={section.id} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <StyledSectionItem
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <div key={id}>
                          <SectionItem {...sectionItemPropList} />
                          {id === showAddLectureId && <LecturePanel {...lecturePanelPropList} />}
                          {!hideSectionLectureList && showLecturelist && renderLectureList(lectureList.sort((a, b) => a.order - b.order), id)}
                        </div>
                      </StyledSectionItem>
                    )}
                  </Draggable>
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          )
        })}
      </DragDropContext>
    </StyledSectionList>
  )
}

export default SectionList
