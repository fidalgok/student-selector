import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import Button from './styled/Button';
import { courseActions, useCourseDispatch } from '../courseContext';

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
  @media (max-width: 750px){
    padding: 0 1.2rem;
  }
`;

const DashboardTitle = styled.h2`
  font-size: 2.8rem;
  margin: 0;
`;

const DashboardButton = styled(Button)`
  text-decoration:none;
  @media (max-width: 520px){
    text-align: center;
  }
`;
const Dashboard = (props) => {
  const courseDispatch = useCourseDispatch();
  const { courses, sessions } = props;

  function renderDashboard() {
    if (!courses || !sessions) return 'loading';
    if (!courses.length) {
      return (
        <div>
          <p>
            Looks like you don't have any courses yet.
          </p>
          <p><DashboardButton className="primary" as={Link} to="/course/new">Create Course</DashboardButton></p>
        </div>
      )
    }
    return (
      <>
        {courses.map(c => <CourseCard course={c} history={props.history} key={c.id} deleteCourse={(courseId) => courseDispatch({ type: courseActions.DELETE_COURSE, courseId })} />)}
      </>
    )
  }
  return (<>
    <DashboardHeader>
      <DashboardTitle>Courses Dashboard</DashboardTitle>
      <DashboardButton className='primary' as={Link} to={`/course/new`}>Create Course</DashboardButton>
    </DashboardHeader>
    {renderDashboard()}
  </>);
}


export default Dashboard;