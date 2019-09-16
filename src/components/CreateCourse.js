import React from 'react';
import { Link } from 'react-router-dom';
import { createCourse } from '../utils';
import { useCourseDispatch, courseActions } from '../courseContext';
import Button from './styled/Button';
import { InputDiv } from './styled/Input';

const CreateCourse = ({ history, ...props }) => {
  const courseDispatch = useCourseDispatch();

  const handleSubmit = async (courseName) => {
    if (!courseName.length) return;
    try {
      const { error, course: newCourse } = await createCourse(courseName);
      if (error) throw new Error(error);
      courseDispatch({ type: courseActions.CREATE_COURSE, course: newCourse });
      history.push(`/course/${newCourse.id}/edit`);
    } catch (err) {
      console.log('Error creating course: ', JSON.stringify(err, null, 2));
    }
  }
  return (
    <>
      <nav>
        <Link to="/" style={{ margin: '0 1.2rem 0 0', color: 'inherit' }}>Dashboard</Link> &rarr;
            <p style={{ display: 'inline-block', margin: '0 0 0 1.2rem' }}> New Course</p>
      </nav>
      <h2>Create Course</h2>
      <EditCourseForm handleSubmit={handleSubmit} {...props} />
    </>
  )
}

export function EditCourseForm({ handleSubmit, cancelButton, course = { name: null }, ...props }) {
  const [courseName, setCourseName] = React.useState(course.name || '');
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(courseName) }}>

      <div>
        <label htmlFor="courseName" style={{ display: 'block', color: 'var(--color-neutral-8)', paddingLeft: '10px', marginBottom: '4px', fontSize: '1.4rem' }}>Course Name</label>
        <InputDiv style={{ width: 'auto' }}>
          <input type="text" id="courseName" name="courseName" placeholder="Enter a course name" onChange={(e) => { setCourseName(e.target.value) }} value={courseName} />
          <Button type="submit">Save</Button>
          {cancelButton && <Button type='button' onClick={props.onCancel}>Cancel</Button>}
        </InputDiv>
      </div>
    </form>
  )
}
export default CreateCourse;