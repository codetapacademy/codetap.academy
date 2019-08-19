import React, { useEffect, useState, Fragment } from 'react';
import HeaderTitle from '../_dumb/header-title';
import { db } from '../data/firebase';
import LectureSlider from '../lecture-slider';

const Home = () => {
  const [data, updateData] = useState({
    courseList: [],
    lectureList: []
  });

  useEffect(() => {
    (async () => {
      const lectureSnapshot = await db
        .collection('lecture')
        .where('published', '==', true)
        .get();

      const lectureList = lectureSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const courseSnapshot = await db
        .collection('course')
        .orderBy('order', 'asc')
        .where('published', '==', true)
        .get();
      const courseList = courseSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      updateData({ lectureList, courseList });
      // console.log(lectureList.map(x => x.course))
    })();
  }, []);

  const renderLectureSlider = (courseId, lectureList) => {
    const lectureSliderPropList = {
      lectureList: lectureList.filter(lecture => lecture.course.id === courseId),
      courseId,
      youtubePlaylistId: data.courseList.find(course => course.id === courseId).youtubePlaylistId
    };
    return <LectureSlider {...lectureSliderPropList} />;
  };

  const renderCourseList = () => {
    return data.courseList.map(({ title, id }) => (
      <Fragment key={id}>
        <HeaderTitle text={title} tag="h2" />
        {renderLectureSlider(id, data.lectureList)}
      </Fragment>
    ));
  };

  return <>{renderCourseList()}</>;
};

export default Home;
