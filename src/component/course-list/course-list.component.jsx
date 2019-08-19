import React from 'react'
import CourseItem from '../course-item/course-item.component';
import { StyledCourseList } from './course-list.style';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const CourseList = ({ courseList = [], goToCourse, updateOrder }) => {
  const renderCourseList = (droppableProvided) => courseList
    .map((course, index) =>
      <Draggable key={course.id} draggableId={course.id} index={index}>
        {(draggableProvided, draggableSnapshot) => (
        <CourseItem
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          key={course.id}
          {...{ ...course, goToCourse }}
        />
        )}
      </Draggable>
    )

  const onDragEnd = ({ destination, source }) => {
    if (!destination || destination.index === source.index) return
    updateOrder(source.index, destination.index)
  }

  return (
    <StyledCourseList>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(droppableProvided) => (
            <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
              {courseList
                .map((course, index) =>
                  <Draggable key={course.id} draggableId={course.id} index={index}>
                    {draggableProvided => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <CourseItem {...{...course, goToCourse }}/>
                      </div>
                    )}
                  </Draggable>
                )}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </StyledCourseList>
  )
}

export default CourseList
