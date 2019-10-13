import React, { useEffect, useState } from 'react';
import HeaderTitle from '../_dumb/header-title';
import { db } from '../data/firebase';
// import { debounce } from 'lodash'
import { navigate } from '@reach/router'
import { StyledCourse, StyledCourseList, StyledWatchNow, StyledButtonWrapper, StyledCourseDescription, StyledCourseDescriptionWrapper, StyledCourseDuration, StyledCourseTitle, StyledCourseHeaderWrapper, StyledTimeIcon, StyledCourseAuthors } from './home.style';
import Pill from '../_dumb/pill';
import Avatar from '../avatar';
import Button from '../_dumb/button';

const Home = () => {
  // const [pageY, setPageY] = useState(0)
  const [data, updateData] = useState({
    courseList: [],
  });

  // const handleScroll = debounce(() => {
  //   setPageY(window.pageYOffset || document.documentElement.scrollTop)
  // }, 500)

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

    // window.addEventListener('scroll', handleScroll)

    // return () => {
    //   window.removeEventListener('scroll', handleScroll)
    // }
  }, []);

  const goToCoursePlayList = id => {
    navigate(`/course/${id}`)
  }

  const renderCourseList = () => {
    return data.courseList
      .map(({ title, id, description, totalDuration, externalThumbnail, courseLevel, customAuthorData, customCoAuthorData }) => (
          <StyledCourse key={id}>
            <StyledCourseHeaderWrapper>
              <StyledCourseTitle>{title}</StyledCourseTitle>
              <StyledCourseDuration>
                <StyledTimeIcon>
                  <i className="ca-clock"></i>
                </StyledTimeIcon>
                {totalDuration || 'Coming soon!'}
              </StyledCourseDuration>
            </StyledCourseHeaderWrapper>
            <StyledCourseDescriptionWrapper externalThumbnail={externalThumbnail}>
            </StyledCourseDescriptionWrapper>
            <StyledCourseAuthors>
              <div>{customAuthorData && <Avatar user={customAuthorData} />}</div>
              <div>{customCoAuthorData && <Avatar user={customCoAuthorData} />}</div>
            </StyledCourseAuthors>
            <StyledCourseDescription>{description}</StyledCourseDescription>
            <StyledButtonWrapper>
              <Button
                onClick={() => goToCoursePlayList(id)}
                label="Watch now"
                color="danger"
              />
              {courseLevel && <Pill label="Level" value={courseLevel} />}
            </StyledButtonWrapper>
          </StyledCourse>
    ));
  };

  return <StyledCourseList>{renderCourseList()}</StyledCourseList>;
};

export default Home;
