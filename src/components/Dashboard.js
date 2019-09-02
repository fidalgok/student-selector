import React from 'react';
import styled from '@emotion/styled';
import Container from '../layout/Container';
import { listCourses } from '../utils';
import Dump from './Dump';
import CourseCard from './CourseCard';
import Button from './styled/Button';
import CreateCourse from './CreateCourse';


const Dashboard = (props) => {
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showCreateCourse, setShowCreateCourse] = React.useState(false);

  const fetchCourses = async () => {
    try {
      const { error: fetchError, courses: courseList } = await listCourses();
      if (fetchError) throw new Error(fetchError);
      setCourses(courseList);
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
           <Button onClick={() => setShowCreateCourse(true)}>Create One</Button>
        </div>
      )
    }
    return (
      <>
        <div>
          <Button onClick={() => setShowCreateCourse(true)}>Add Course</Button>
        </div>
        {courses.map(c => <CourseCard course={c} setShowCreateCourse={setShowCreateCourse} key={c.id} setCourses={(courseId) => setCourses(courses.filter(c => c.id !== courseId))} />)}
      </>
    )
  }
  return (<>
    <Container>

      Dashboard
      <main>
        {!showCreateCourse && renderDashboard()}
        {showCreateCourse && <CreateCourse
          setShowCreateCourse={setShowCreateCourse}
          setCourses={(newCourse) => setCourses([newCourse, ...courses])}
        />}
      </main>
    </Container>

  </>);
}


export default Dashboard;