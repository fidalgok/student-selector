import React from 'react';
import { useCourseState } from '../courseContext';
import CreateCourse from '../components/CreateCourse';
import EditCourse from '../components/EditCourse';

const Course = (props) => {
  const { courses } = useCourseState();
  const course = courses.find(c => c.id === props.match.params.id);
  function renderCourse() {
    if (props.isEditing) return <EditCourse course={course} />
    return <CreateCourse />
  }
  return (<>
    {!course ? ('loading') : (
      <div>
        {course.name}
      </div>
    )}

  </>);
}

export default Course;