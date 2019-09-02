import React from 'react';
import Button from './styled/Button';
import { deleteCourse } from '../utils'

const CourseCard = ({ course, ...props }) => {
  console.log(course);
  const handleDelete = async () => {
    deleteCourse(course.id);
    props.setCourses(course.id);
  }
  return (<div key={course.id}>
    <p>{course.name}</p>
    <Button>Start New Session</Button>
    <Button>Manage Students</Button>
    {!course.sessions.items.length && <Button onClick={handleDelete}>Delete Course</Button>}
    <div>
      Course Info, num students, num sessions
    </div>
  </div>);
}

export default CourseCard;