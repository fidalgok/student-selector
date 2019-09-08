import React from 'react';
import styled from '@emotion/styled';
//import CSVReader from 'react-csv-reader';
import { courseActions } from '../courseContext';
import { updateCourseStudents } from '../utils';
import Button from './styled/Button';
import BaseInput from './styled/Input';


const Form = styled.form`
  margin-bottom: 2.4rem;

  h3 {
    margin-bottom: 1.2rem;
  }
`;
const Input = styled(BaseInput)`
  margin-right: 1.2rem;
`;
const Label = styled.label`
  font-size: 1.2rem;
  display: block;
  margin-bottom: .8rem;
  color: var(--color-neutral-8);
`;

export const CreateStudentForm = ({ courseId = '', studentList = [], courseDispatch = () => { }, setState = () => { } }) => {
  const [studentName, setStudentName] = React.useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName.length) return;
    try {
      const { error, students } = await updateCourseStudents(courseId, [{ name: studentName }, ...studentList]);
      if (error) throw new Error(error);

      courseDispatch({ type: courseActions.UPDATE_COURSE, course: { id: courseId, students } });

      setState({
        type: 'create_student',
        student: { name: studentName },
      });

    } catch (err) {
      console.log(err);
    }
    setStudentName('');
  }

  // const handleFileLoad = (data) => {
  //   const header = data.slice(0, 1);
  //   const students = data.slice(1);
  //   let match = new RegExp('student name|student_name|studentname/', 'i');
  //   if (header[0].find(heading => heading.match(match))) {
  //     // found a match for student name
  //     console.log({
  //       header, students
  //     })
  //   }

  // }

  return (

    <Form onSubmit={handleSubmit}>
      <h3>Add New Students</h3>
      <div>
        <Label htmlFor="studentName">Student Name</Label>
        <Input type="text" id="studentName" name="studentName"
          onChange={(e) => {
            setStudentName(e.target.value);
          }}
          value={studentName}
        />
        <Button className="primary" type="submit">Create</Button>
      </div>
      <div>
        {/* <CSVReader
          cssClass="react-csv-input"
          label="Select CSV student names"
          onFileLoaded={handleFileLoad}

        /> */}
      </div>
    </Form>
  )
}
