import React from 'react';
import styled from '@emotion/styled';
import Header from '../layout/Header';
import Container from '../layout/Container';
import Router from '../Router';
import { CourseProvider, useCourseState, useCourseDispatch, courseActions } from '../courseContext'
import { listCourses } from '../utils';

export const AppContainer = styled(Container)`
  &::before {
    position: absolute;
    background: var(--color-neutral-10);
    z-index: -1;
    left: 0;
    top:0;
    display: block;
    content: " ";
    height: 27rem;
    width: 100%;
  }
`;

export const Main = styled.main`
  border-radius: 12px;
  background: var(--color-white);
  z-index: 1;
  padding: 4rem;
`;

const LoggedIn = (props) => {
  const { courses } = useCourseState();
  const courseDispatch = useCourseDispatch();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchCourses = async () => {
    try {
      const { error: fetchError, courses: courseList } = await listCourses();
      if (fetchError) throw new Error(fetchError);
      courseDispatch({ type: courseActions.LOAD_COURSES, courses: courseList })
      setLoading(false);
    } catch (err) {
      setLoading(false)
      setError(err);
    }
  }

  React.useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <Header />
      <AppContainer>
        <Main>
          <Router courses={courses}>
          </Router>
        </Main>
      </AppContainer>
    </>
  );
}

const LoggedInWithCourses = (props) => {
  return (
    <CourseProvider>
      <LoggedIn />
    </CourseProvider>
  )
}

export default LoggedInWithCourses;