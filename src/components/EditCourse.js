import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import { isEqual } from 'lodash/lang'
import { updateCourse, updateCourseStudents, deleteCourseStudent } from '../utils';
import { useCourseDispatch, courseActions } from '../courseContext';
import BaseButton from './styled/Button';
import { InputDiv } from './styled/Input';
import { CreateStudentForm } from './CreateStudentForm';
import { EditCourseForm } from './CreateCourse';


const Button = styled(BaseButton)`
  margin: 0 .8rem;
  padding: .8rem 1rem;
`;



const EditCourse = ({ course = { name: '', students: [] }, ...props }) => {
  // use updatedStudents to handle state of this component, will
  // send only the name to the courseDispatch for updates
  const [updatedStudents, setUpdatedStudents] = React.useState([]);
  const [editCourseName, setEditCourseName] = React.useState(false);
  const courseDispatch = useCourseDispatch();

  React.useEffect(() => {
    // only if the list of students change do I want to
    // map over them so editing is easier in this component
    // probably a better way to do this...

    if (isEqual(updatedStudents, course.students)) return;

    setUpdatedStudents(course.students.map(student => ({ name: student.name, id: uuid(), isEditing: false, courseId: course.id })))
  }, [course.students]);

  function handleEditCourseNameClick() {
    setEditCourseName(true);
  }

  function handleEditStudentClick(e) {
    const studentId = e.target.dataset.id;
    const foundStudent = updatedStudents.find(s => s.id === studentId);
    foundStudent.isEditing = !foundStudent.isEditing;
    setUpdatedStudents([...updatedStudents]);
  }

  async function handleDeleteStudentClick(e) {
    const studentId = e.target.dataset.id;
    const filteredStudents = updatedStudents.filter(s => s.id !== studentId).map(s => ({ name: s.name }));
    try {
      const { error } = await deleteCourseStudent(courseDispatch, course.id, filteredStudents);
      if (error) throw new Error(error);

    } catch (error) {
      console.log('error deleting student: ', error);
    }

  }

  async function handleCourseSubmit(courseName) {
    if (!courseName.length) return;
    try {
      const { error } = await updateCourse(courseDispatch, course.id, { name: courseName });
      if (error) throw new Error(error);
      setEditCourseName(false);
    } catch (err) {
      console.log('Error updating course: ', JSON.stringify(err, null, 2));
    }
  }

  function renderEditCourse() {
    if (!course) return <div>Loading...</div>
    return (<>
      <nav>
        <Link to="/" style={{ margin: '0 1.2rem 0 0', color: 'inherit' }}>Dashboard</Link> &rarr;
            <p style={{ display: 'inline-block', margin: '0 0 0 1.2rem' }}> New Course</p>
      </nav>
      {editCourseName && <EditCourseForm handleSubmit={handleCourseSubmit} cancelButton={true} course={course} handleCancel={() => setEditCourseName(false)} />}
      {!editCourseName && (
        <div>
          {course.name}
          <Button onClick={handleEditCourseNameClick}>Edit</Button>
        </div>
      )}

      <div>
        <h2>Students</h2>
        <CreateStudentForm studentList={course.students} courseId={course.id} courseDispatch={courseDispatch} />

        {updatedStudents.map((student) => {
          return student.isEditing ? (
            <EditStudent
              key={student.id}
              student={student}
              updatedStudents={updatedStudents}
              courseDispatch={courseDispatch}
              handleCancel={handleEditStudentClick}
            />
          ) : (
              <div key={student.id}>
                <span style={{ marginRight: '2.4rem' }}>
                  {student.name}
                </span>
                <Button className="secondary" data-id={student.id} onClick={handleEditStudentClick}>Edit</Button>
                <Button className="danger" data-id={student.id} onClick={handleDeleteStudentClick}>Delete</Button>
              </div>
            )
        })}
      </div>
    </>)
  }
  return renderEditCourse();
}

function EditStudent({ student, handleCancel, courseDispatch, updatedStudents }) {
  const [value, setValue] = React.useState(student.name);
  const handleChange = (e) => setValue(e.target.value);
  const inputRef = React.useRef(null)
  // when component is ready take focus on the input
  React.useEffect(() => {
    inputRef.current.focus();
  }, [])

  const handleSubmit = async (e) => {
    const studentId = e.target.dataset.id;
    // map over students and update the appropriate one, change the data back to what the db is expecting!
    const studentList = updatedStudents.map(s => s.id === studentId ? { name: value } : { name: s.name });
    // update the students in the DB
    try {
      const { error, students } = await updateCourseStudents(student.courseId, studentList);
      if (error) throw new Error(error);
      // update local state
      courseDispatch({ type: courseActions.UPDATE_COURSE, course: { id: student.courseId, students } });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <InputDiv as='div'>
      <input type='text' id={student.name} name={student.name} value={value} onChange={handleChange} ref={inputRef} />
      <Button className="secondary" data-id={student.id} onClick={handleSubmit}>Save</Button>
      <Button className="secondary" data-id={student.id} onClick={handleCancel}>Cancel</Button>
    </InputDiv>
  )
}

export default EditCourse;