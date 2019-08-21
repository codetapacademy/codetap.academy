import React, { useState } from 'react'
import { StyledSectionList, StyledSectionItem } from './section-list.style';
import { db, storage } from '../data/firebase'
import SectionItem from '../section-item';
import LecturePanel from '../lecture-panel';
import LectureItem from '../lecture-item/lecture-item.component';
import { removeLectureFromSectionAction, initSectionListAction } from '../course/section.action';
import { WebInfoState } from '../web-info/web-info.context';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const SectionList = ({ data = [], handleUpdate, course = {} }) => {
  const [showAddLectureId, setShowAddLectureId] = useState('nimic')
  const { updateSectionList } = WebInfoState()
  const sectionCollection = db.collection('section')

  const deleteItem = id => {
    sectionCollection
      .doc(id)
      // TODO, mark as deleted and never delete
      // some other logic should display data only if not marked as deleted
      .delete()
      .then(aaa => {
        // console.log(`Item with id: ${id} is no longer with us`, aaa)
      })
      .catch(message => console.log(`Weird message!`, message))
  }

  const deleteLectureItem = (id, sectionId) => {
    db
      .collection('lecture')
      .doc(id)
      .delete()
      .then(aaa => {
        // console.log(`Item with id: ${id} is no longer with us`, aaa)
        updateSectionList(removeLectureFromSectionAction(id, sectionId))
        // remove image if it exists
        const imageRef = storage
          .ref("lecture-picture")
          .child(id)
          .delete()
          .then(console.log)
          .catch(console.log)

      })
      .catch(message => console.log(`Weird message!`, message))
  }

  const renderLectureList = (lectureList, sectionId) => {
    return (lectureList || []).map(lecture => {
      return (
        <LectureItem key={lecture.id} {...lecture} sectionId={sectionId} remove={deleteLectureItem} />
      )
    })
  }

  const updateOrder = (a, b) => {
    const list = [...data]
    const [ first ] = list.splice(a, 1)
    list
      .splice(b, 0, first)
      
    const batch = db.batch()
    list
      .map((o, order) => ({ ...o, order}))
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

  const onDragEnd = ({ destination, source }) => {
    if (!destination || destination.index === source.index) return
    updateOrder(source.index, destination.index)
  }
  console.log(data)

  return (
    <StyledSectionList>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(droppableProvided) => (
            <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
              {data.map(({ title, description, id, lectureList }, index) => {
                const section = {
                  title,
                  description,
                  id,
                }

                const sectionItemPropList = {
                  ...section,
                  showAddLectureId,
                  setShowAddLectureId,
                  deleteItem,
                  handleUpdate
                }

                const lecturePanelPropList = {
                  section,
                  course,
                  showAddLectureId,
                  setShowAddLectureId,
                }
                return (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <StyledSectionItem key={id}>
                        <SectionItem {...sectionItemPropList} />
                        {id === showAddLectureId && <LecturePanel {...lecturePanelPropList} />}
                        {renderLectureList(lectureList, id)}
                      </StyledSectionItem>
                    </div>
                  )}
                  </Draggable>
                )
              })}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </StyledSectionList>
  )
}

export default SectionList
