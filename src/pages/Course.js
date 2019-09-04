import React from 'react';
import { useCourseState } from '../courseContext';

const Course = (props) => {
  const { courses } = useCourseState();
  const course = courses.find(c => c.id === props.match.params.id);
  return (<>{course.name}</>);
}

export default Course;