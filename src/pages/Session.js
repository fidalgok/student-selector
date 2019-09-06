import React from 'react';
import styled from '@emotion/styled';
import BaseButton from '../components/styled/Button';
import { getRandomArrayIdx, updateSession } from '../utils';
import { useCourseDispatch } from '../courseContext';

/**************
<section>

    <div class="card">
      <p class="ta-c">Students Left: 19</p>
    </div>
    <div class="card">
      <h3>Called Students</h3>
      <ul class="called-student-list">
        <li>
          <span>Joe Schmo</span>
          <div class="called-student-score score-none">
            Not scored
          </div>
        </li>
        <li>
          <span>Jane Doe</span>
          <div class="called-student-score score-checkminus">
            Check Minus
          </div>
        </li>
        <li>
          <span>Sue Smith</span>
          <div class="called-student-score score-check">
            Check
          </div>
        </li>
        <li>
          <span>Curtis Hall</span>
          <div class="called-student-score score-checkplus">
            Check Plus
          </div>
        </li>
      </ul>
    </div>
  </section>
  ********/

const Section = styled.section`
 margin-top: 1.2rem;
 padding: 1.6rem 0;
 display: flex;
 justify-content: center;
 ul {
  list-style: none;
  margin: 0;
  padding: 0;
 }

 li {
  padding: 2.4rem 0;
  margin: 0;
 }

 li:not(:last-of-type){
   border-bottom: var(--color-neutral-2);
 }

 li span{
  display: inline-block;
  margin-bottom: 8px;
  padding: 1.2rem .4rem;
}

`;

const SectionContainer = styled.div`
  max-width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Button = styled(BaseButton)`
  &.secondary {
    background: var(--color-neutral-2);
  }
  &[disabled]{
    cursor: not-allowed;
  }
`;
const CalledStudent = styled.p`
  font-size: 3.2rem;
  text-align: center;
`;

const StudentRatingContainer = styled.div`
   margin-bottom: 2.4rem;
  display: flex;
  justify-content: center;
`;

const SectionHeading = styled.p`
  font-size: 3.2rem;
  text-align: center;
  margin:0 0 2.4rem;
`;

const Session = ({ session, ...props }) => {
  console.log(session);
  const [isSessionComplete, setIsSessionComplete] = React.useState(session.remainingStudents.length === 0);
  const courseDispatch = useCourseDispatch();
  const calledStudent = session.calledStudents.length ? session.calledStudents[session.calledStudents.length - 1] : {
    student: { name: 'Call a Student' }
  };
  React.useEffect(() => {

    if (session.remainingStudents.length === 0) setIsSessionComplete(true)
  })
  const handleNextStudent = async () => {
    let studentList = session.remainingStudents.slice();
    let randomStudentIndex = getRandomArrayIdx(studentList.length);
    let [randomStudent] = studentList.splice(randomStudentIndex, 1);
    let calledStudents = [{ student: randomStudent, calledDate: new Date() }, ...session.calledStudents]
    // update the session state

    try {

      const { error } = await updateSession(courseDispatch, {
        id: session.id,
        remainingStudents: studentList,
        calledStudents
      });

      if (error) throw new Error(error)
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  const handleStudentScore = () => {

  }
  return (
    <>
      <Section>
        <SectionContainer>
          <CalledStudent>{calledStudent.student.name}</CalledStudent>
          {!!session.calledStudents.length && (
            <>
              <StudentRatingContainer >
                <Button className="secondary" onClick={handleStudentScore}> check minus</Button>
                <Button className="secondary" onClick={handleStudentScore}> check </Button>
                <Button className="secondary" onClick={handleStudentScore}> check plus</Button>
              </StudentRatingContainer>
            </>
          )
          }
          {session.calledStudents.length ? (
            <Button className="primary" onClick={handleNextStudent} disabled={isSessionComplete}>
              Next Student
        </Button>
          ) : (
              <Button className="primary" onClick={handleNextStudent} disabled={isSessionComplete}>
                Begin Session
        </Button>
            )}
        </SectionContainer>
      </Section>
      <Section>
        <SectionContainer>
          <p style={{ textAlign: 'center' }}>Students Left: {session.remainingStudents.length}</p>
        </SectionContainer>
      </Section>
      {session.calledStudents.length > 0 && <Section>
        <SectionContainer>
          <SectionHeading>
            Called Students
          </SectionHeading>
        </SectionContainer>
      </Section>}
    </>
  );
}

export default Session;