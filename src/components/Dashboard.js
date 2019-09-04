import React from 'react';
import styled from '@emotion/styled';

import { listCourses } from '../utils';
import Dump from './Dump';
import CourseCard from './CourseCard';
import Button from './styled/Button';
import CreateCourse from './CreateCourse';
import { useCourseState, courseActions, useCourseDispatch } from '../courseContext';



const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

const DashboardTitle = styled.h2`
  font-size: 2.8rem;
  margin: 0;
`;

const DashboardButton = styled(Button)`

`;
const Dashboard = (props) => {
  const courseState = useCourseState();
  const courseDispatch = useCourseDispatch();
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showCreateCourse, setShowCreateCourse] = React.useState(false);

  const fetchCourses = async () => {
    try {
      const { error: fetchError, courses: courseList } = await listCourses();
      if (fetchError) throw new Error(fetchError);
      setCourses(courseList);
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

  function renderDashboard() {
    if (loading) {
      return (
        <div>Loading...</div>
      )
    }
    if (error) {
      return (
        <Dump json={error}></Dump>
      )
    }
    if (!courses.length) {
      return (
        <div>
          Looks like you don't have any courses yet.
        </div>
      )
    }
    return (
      <>
        {courses.map(c => <CourseCard course={c} setShowCreateCourse={setShowCreateCourse} key={c.id} deleteCourse={(courseId) => setCourses(courses.filter(c => c.id !== courseId))} />)}
      </>
    )
  }
  return (<>
    {!showCreateCourse && (
      <>
        <DashboardHeader>
          <DashboardTitle>Courses Dashboard</DashboardTitle>
          <DashboardButton className='primary' onClick={() => setShowCreateCourse(true)}>Create One</DashboardButton>
        </DashboardHeader>
        {renderDashboard()}
      </>
    )}
    {showCreateCourse && <CreateCourse
      setShowCreateCourse={setShowCreateCourse}
      setCourses={(newCourse) => setCourses([newCourse, ...courses])}
    />}


  </>);
}


export default Dashboard;