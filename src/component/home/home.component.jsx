import React, { useEffect, useState, Fragment } from 'react';
import HeaderTitle from '../_dumb/header-title';
import { db } from '../data/firebase';
import { debounce } from 'lodash'
import { StyledCourse, StyledCourseList } from './home.style';

const Home = () => {
  const [pageY, setPageY] = useState(0)
  const [data, updateData] = useState({
    courseList: [],
  });

  const handleScroll = debounce(() => {
    setPageY(window.pageYOffset || document.documentElement.scrollTop)
  }, 500)

  useEffect(() => {
    (async () => {
      const courseSnapshot = await db
        .collection('course')
        .orderBy('order', 'asc')
        .where('published', '==', true)
        .get();
      const courseList = courseSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      updateData({ courseList });
    })();

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  const renderCourseList = () => {
    return data.courseList.map(({ title, id, description, totalDuration, externalThumbnail }) => (
      <StyledCourse key={id} externalThumbnail={externalThumbnail}>
        <HeaderTitle text={title} tag="h2" />
        <p>{description}</p>
        <time>{totalDuration}</time>
      </StyledCourse>
    ));
  };

  return <StyledCourseList>{renderCourseList()}</StyledCourseList>;
};

export default Home;
