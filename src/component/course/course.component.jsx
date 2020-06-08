import React, { useEffect, useState } from 'react';
import { db } from '../data/firebase';
import { WebInfoState } from '../web-info/web-info.context';
import SectionPanel from '../section-panel/section-panel.component';
import Avatar from '../avatar'
import {
  addSectionAction,
  removeSectionAction,
  modifySectionAction,
  initSectionListAction
} from '../course/section.action';
import HeaderTitle from '../_dumb/header-title/header-title.component';
import courseSchema from './course.schema';
import DynamicForm from '../_dumb/dynamic-form/dynamic-form.component';
import { getCourseTitlePropList, getCourseSettingsPropList } from './course.config';
import { StyledCourseWrapper } from './course.style';

const Course = ({ courseId }) => {
  const { updateSectionList } = WebInfoState();
  const [course, setCourse] = useState({});
  const courseDocument = db.collection('course').doc(courseId);
  const [userList, setUserList] = useState([])

  useEffect(() => {
    let unsubscribe, unsubscribeToCourse;
    (async () => {
      const userSnap = await db.collection('user').get()
      const userList = userSnap.docs.map(user => ({ id: user.id, ...user.data() }))
      setUserList(userList)

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
          const docData = doc.data()
          const lectureId = doc.id;
          const lectureContent = { ...docData, totalDuration: (docData && docData.totalDuration) || '00:00:00' }


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

        const totalDurationParts = Object
          .keys(lectureKeyList || [])
          .map(key => lectureKeyList[key].map(({ duration = '00:00:00' }) => duration.split(':').map(t => +t)))
          .reduce((a, c) => [...a, ...c], [])
          .reduce((a, c) => {
            a.h += c[0]
            a.m += c[1]
            a.s += c[2]
            return a
          }, { h: 0, m: 0, s: 0 })
        const totalSeconds = totalDurationParts.h * 3600 + totalDurationParts.m * 60 + totalDurationParts.s
        const seconds = totalSeconds % 60
        const minutes = (totalSeconds % 3600 - seconds) / 60
        const hours = ~~(totalSeconds / 3600)
        const totalDuration = `${hours}h ${minutes}m`

        courseDocument.set({ totalDuration, totalSeconds }, { merge: true })
      } catch (e) {
        console.error('Get lectureSnapshotList failed', e);
      }

      const sectionCollection = db
        .collection('section')
        .orderBy('order', 'asc')
        .where('course.id', '==', courseId);

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
                ...section,
                title: section.title,
                description: section.description || '',
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

  const toggleCourseHeader = () => {
    console.log('Toggle couse header')
    courseDocument.set({ toggleHeader: !course.toggleHeader }, { merge: true });
  }

  const courseTitlePropList = getCourseTitlePropList(course.title);

  const courseSettingsPropList = getCourseSettingsPropList()

  const handlePublish = () => {
    courseDocument.set({ published: !course.published }, { merge: true });
  };

  if (course) {
    courseSchema.filedList.courseLevel.getOptionLabel = option => <div style={{ color: 'black' }}>{option.label}</div>
    courseSchema.filedList.version.getOptionLabel = option => <div style={{ color: 'black' }}>{option.label}</div>
  }
  if (courseSchema.filedList.courseAuthorCustom) {
    courseSchema.filedList.courseAuthorCustom.getOptionLabel = option => <div style={{ color: 'black' }}><Avatar user={option.user} /></div>
    courseSchema.filedList.courseAuthorCustom.options = userList
      .map(user => ({ user: { displayName: user.displayName, photoURL: user.photoURL }, label: user.displayName, value: user.id }))
  }
  if (courseSchema.filedList.courseCoAuthorCustom) {
    courseSchema.filedList.courseCoAuthorCustom.getOptionLabel = option => <div style={{ color: 'black' }}><Avatar user={option.user} /></div>
    courseSchema.filedList.courseCoAuthorCustom.options = userList
      .map(user => ({ user: { displayName: user.displayName, photoURL: user.photoURL }, label: user.displayName, value: user.id }))
  }

  return (
    <div>
      <StyledCourseWrapper>
        <HeaderTitle {...courseTitlePropList} />
        <button onClick={toggleCourseHeader}>{course.toggleHeader ? 'Hide' : 'Show'} header</button>
      </StyledCourseWrapper>
      {course.toggleHeader && <div>
        <p>{course.description}</p>
        <DynamicForm schema={courseSchema} data={course} dbItem={courseDocument} />
        <HeaderTitle {...courseSettingsPropList} />
        <button onClick={handlePublish}>{course.published ? 'Unp' : 'P'}ublish Course</button>
      </div>}
      {course && <SectionPanel showHeader={course.toggleHeader} course={course} />}
    </div>
  );
};

export default Course;
