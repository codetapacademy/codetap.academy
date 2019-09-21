import React, { useEffect, useState } from 'react';
import HeaderTitle from '../_dumb/header-title';
import { db } from '../data/firebase';
import { debounce } from 'lodash'
import { navigate } from '@reach/router'
import { StyledCourse, StyledCourseList, StyledWatchNow, StyledButtonWrapper, StyledCourseDescription, StyledCourseDescriptionWrapper, StyledCourseDuration } from './home.style';
import Pill from '../_dumb/pill';

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

  const goToCoursePlayList = id => {
    console.log(id)
    navigate(`/course/${id}`)
  }

  const renderCourseList = () => {
    return data.courseList
      .map(({ title, id, description, totalDuration, externalThumbnail, courseLevel }) => (
          <StyledCourse key={id}>
            <HeaderTitle text={title} tag="h2" fontSize="1.2rem" />
            <StyledCourseDescriptionWrapper externalThumbnail={externalThumbnail}>
              <StyledCourseDescription>{description}</StyledCourseDescription>
            </StyledCourseDescriptionWrapper>
            <StyledCourseDuration>Duration: {totalDuration || 'Coming soon :)'}</StyledCourseDuration>
            <StyledButtonWrapper>

              <StyledWatchNow
                onClick={() => goToCoursePlayList(id)}
              >Watch now</StyledWatchNow>
              {courseLevel && <Pill label="Level" value={courseLevel} />}
            </StyledButtonWrapper>
          </StyledCourse>
    ));
  };

  return <StyledCourseList>{renderCourseList()}</StyledCourseList>;
};

export default Home;
