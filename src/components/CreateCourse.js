import React from 'react';
import { Link } from 'react-router-dom';
import { createCourse } from '../utils';
import { useCourseDispatch, courseActions } from '../courseContext';

import { CreateStudentForm } from './CreateStudentForm';
import { Input } from './styled/Form';
import Button from './styled/Button';

const initialState = {
  course: null,
  students: [],
}

const createCourseReducer = (state, action) => {
  switch (action.type) {
    case 'create_course':
      return {
        ...state,
        course: { ...action.course }
      }
    case 'create_student':

      return {
        ...state,
        students: [action.student, ...state.students],
      }
    default:
      throw new Error('unsupported action type in create course reducer');
  }
}

const CreateCourse = (props) => {
  const [state, dispatch] = React.useReducer(createCourseReducer, initialState);
  const [formType, setFormType] = React.useState(props.stage || 'course');
  const courseDispatch = useCourseDispatch();

  const renderStages = () => {
    switch (formType) {
      case 'course':
        return <CreateCourseForm setState={dispatch} setFormType={setFormType} courseDispatch={courseDispatch} />
      case 'student':
        return (
          <>
            <h2>Add students to {state.course.name}</h2>
            <CreateStudentForm setState={dispatch} setFormType={setFormType} courseDispatch={courseDispatch} courseId={state.course.id} studentList={state.students} />
            <StudentList students={state.students} />
          </>
        )
    }
  }

  return (
    <>
      <h2>Create a course and add your students</h2>
      {state.course && <Link to='/'>Done Editing Course</Link>}
      {renderStages()}
    </>
  )
}

export const CreateCourseForm = (props) => {
  const [courseName, setCourseName] = React.useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName.length) return;
    try {
      const { error, course: newCourse } = await createCourse(courseName);
      if (error) throw new Error(error);
      props.courseDispatch({ type: courseActions.CREATE_COURSE, course: newCourse });
      props.setState({
        type: 'create_course',
        course: newCourse
      })
      props.setFormType('student')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Course</h2>
      <div>
        <label htmlFor="courseName">Course Name</label>
        <Input type="text" id="courseName" name="courseName" onChange={(e) => {
          setCourseName(e.target.value)
        }
        }
        />
        <Button>Create</Button>
      </div>
    </form>
  )
}



const StudentList = ({ students }) => {
  return (
    <ul>
      {students.length > 0 && students.map((student, i) => (
        <li key={i}>{student.name}</li>
      ))}
    </ul>
  )
}
export default CreateCourse;