import React from 'react';
import { createCourse } from '../utils';
import { useCourseDispatch, courseActions } from '../courseContext';
import Button from './styled/Button';
import { InputDiv } from './styled/Input';

const CreateCourse = ({ history }) => {
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
      <EditCourseForm handleSubmit={handleSubmit} />
    </>
  )
}

export function EditCourseForm({ handleSubmit, cancelButton, course = { name: null } }) {
  const [courseName, setCourseName] = React.useState(course.name || '');
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(courseName) }}>
      <h2>Create Course</h2>
      <div>
        <label htmlFor="courseName">Course Name</label>
        <InputDiv>
          <input type="text" id="courseName" name="courseName" onChange={(e) => { setCourseName(e.target.value) }} value={courseName} />
          <Button type="submit">Save</Button>
          {cancelButton && <Button className="secondary">Cancel</Button>}
        </InputDiv>
      </div>
    </form>
  )
}
export default CreateCourse;