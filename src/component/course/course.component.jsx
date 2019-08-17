import React, { useEffect, useState } from 'react';
import { db } from '../data/firebase';
import { WebInfoState } from '../web-info/web-info.context';
import SectionPanel from '../section-panel/section-panel.component';
import {
  addSectionAction,
  removeSectionAction,
  modifySectionAction,
  initSectionListAction
} from '../course/section.action';
import HeaderTitle from '../_dumb/header-title/header-title.component';
import courseSchema from './course.schema';
import DynamicForm from '../_dumb/dynamic-form/dynamic-form.component';

const Course = ({ courseId }) => {
  const { updateSectionList } = WebInfoState();
  const [lectureBySectionIdList, setLectureBySectioIdList] = useState({});
  const [course, setCourse] = useState({});
  const courseDocument = db.collection('course').doc(courseId);

  useEffect(() => {
    let unsubscribe, unsubscribeToCourse;
    (async () => {
      const lectureKeyList = {};
      // I want to get the course info
      unsubscribeToCourse = courseDocument
        // .get()
        .onSnapshot(snapshot => {
          setCourse({
            id: courseId,
            ...snapshot.data()
          });
        });

      // I want to get all the lectures based on the courseId
      try {
        const lectureSnapshotList = await db
          .collection('lecture')
          .where('course.id', '==', courseId)
          .get();
        lectureSnapshotList.docs.forEach(doc => {
          const lectureId = doc.id;
          const lectureContent = doc.data();
          if (lectureKeyList.hasOwnProperty(lectureContent.section.id)) {
            lectureKeyList[lectureContent.section.id] = [
              ...lectureKeyList[lectureContent.section.id],
              {
                id: lectureId,
                ...lectureContent
              }
            ];
          } else {
            lectureKeyList[lectureContent.section.id] = [
              {
                id: lectureId,
                ...lectureContent
              }
            ];
          }
        });
      } catch (e) {
        console.error('Get lectureSnapshotList failed', e);
      }

      const sectionCollection = db.collection('section').where('course.id', '==', courseId);

      const sectionSnapshotList = await sectionCollection.get();
      const sectionList = sectionSnapshotList.docs.map(d => {
        return {
          id: d.id,
          ...d.data(),
          lectureList: lectureKeyList[d.id] || []
        };
      });

      unsubscribe = sectionCollection.onSnapshot(snapList => {
        snapList.docChanges().forEach(change => {
          const section = change.doc.data();
          if (change.type === 'added' && change.doc.metadata.hasPendingWrites) {
            updateSectionList(
              addSectionAction({
                title: section.title,
                description: section.description,
                id: change.doc.id
              })
            );
          } else if (change.type === 'removed') {
            updateSectionList(
              removeSectionAction({
                id: change.doc.id
              })
            );
          } else if (change.type === 'modified') {
            updateSectionList(
              modifySectionAction({
                title: section.title,
                description: section.description,
                id: change.doc.id
              })
            );
            // setSectionIdToEdit(null)
          }
        });
      });

      updateSectionList(initSectionListAction(sectionList));
    })();
    return () => {
      unsubscribe();
      unsubscribeToCourse();
    };
  }, []);

  const courseTitlePropList = {
    text: course.title,
    tag: 'h1',
    fontSize: '22px'
  };

  const courseSettingsPropList = {
    text: 'Course Settings',
    tag: 'h2',
    fontSize: '20px'
  };

  const handlePublish = () => {
    courseDocument.set({ published: !course.published }, { merge: true });
  };

  return (
    <div>
      <HeaderTitle {...courseTitlePropList} />
      <p>{course.description}</p>
      {console.log(course)}
      <DynamicForm schema={courseSchema} data={course} dbItem={courseDocument} />
      <HeaderTitle {...courseSettingsPropList} />
      <button onClick={handlePublish}>{course.published ? 'Unp' : 'P'}ublish Course</button>
      {course && <SectionPanel course={course} />}
    </div>
  );
};

export default Course;
