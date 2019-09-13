import React from 'react';
import styled from '@emotion/styled';
import Header from '../layout/Header';
import Container from '../layout/Container';
import Router from '../Router';
import { CourseProvider, useCourseState, useCourseDispatch, courseActions } from '../courseContext';
import { SessionProvider, useSessionState, useSessionDispatch } from '../sessionContext';
import { listCourses, listSessions } from '../utils';

export const AppContainer = styled(Container)`
  &::before {
    position: absolute;
    background: var(--color-red-10);
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

  @media (max-width: 750px){
    padding: 2rem 1rem;
    border-radius: 0;
  }
`;

const LoggedIn = (props) => {
  const { courses } = useCourseState();
  const { sessions } = useSessionState();
  const courseDispatch = useCourseDispatch();
  const sessionDispatch = useSessionDispatch();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchData = async () => {
    try {
      const { error: courseError, courses: courseList } = await listCourses();
      const { error: sessionError } = await listSessions(sessionDispatch);
      if (sessionError) throw new Error(sessionError);
      if (courseError) throw new Error(courseError);
      courseDispatch({ type: courseActions.LOAD_COURSES, courses: courseList })
      setLoading(false);
    } catch (err) {
      setLoading(false)
      setError(err);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <AppContainer>
        <Main>
          {loading && <div>Loading</div>}
          {error && <div>{JSON.stringify(error, null, 2)}</div>}
          {!loading && !error && <Router courses={courses} sessions={sessions}>
          </Router>}
        </Main>
      </AppContainer>
    </>
  );
}

const LoggedInWithCourses = (props) => {
  return (
    <SessionProvider>

      <CourseProvider>
        <LoggedIn />
      </CourseProvider>
    </SessionProvider>
  )
}

export default LoggedInWithCourses;