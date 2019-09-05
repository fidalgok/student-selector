import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import Button from './styled/Button';
import CreateCourse from './CreateCourse';
import { courseActions, useCourseDispatch } from '../courseContext';



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
  text-decoration:none;
`;
const Dashboard = (props) => {
  const courseDispatch = useCourseDispatch();
  const [showCreateCourse, setShowCreateCourse] = React.useState(false);
  const { courses } = props;

  function renderDashboard() {
    if (!courses) return 'loading';
    if (!courses.length) {
      return (
        <div>
          Looks like you don't have any courses yet.
        </div>
      )
    }
    return (
      <>
        {courses.map(c => <CourseCard course={c} history={props.history} setShowCreateCourse={setShowCreateCourse} key={c.id} deleteCourse={(courseId) => courseDispatch({ type: courseActions.DELETE_COURSE, courseId })} />)}
      </>
    )
  }
  return (<>
    {!showCreateCourse && (
      <>
        <DashboardHeader>
          <DashboardTitle>Courses Dashboard</DashboardTitle>
          <DashboardButton className='primary' as={Link} to={`/course/new`} onClick={() => setShowCreateCourse(true)}>Create Course</DashboardButton>
        </DashboardHeader>
        {renderDashboard()}
      </>
    )}
    {showCreateCourse && <CreateCourse
      setShowCreateCourse={setShowCreateCourse}
    />}


  </>);
}


export default Dashboard;