import React from 'react';
import styled from '@emotion/styled';
import { Link as BaseLink } from 'react-router-dom';
import BaseButton from '../components/styled/Button';
import { getRandomArrayIdx, updateSession, createSession } from '../utils';
import { useCourseState } from '../courseContext';
import { useSessionDispatch } from '../sessionContext';

const Section = styled.section`
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;
 }

 li:not(:last-of-type){
   border-bottom: 1px solid var(--color-neutral-2);
 }
`;

const SectionContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Button = styled(BaseButton)`
  &.secondary {
    background: var(--color-neutral-2);
    padding: 1rem .8rem;
  }
  &.score-checkminus {
  background: #FF9B9B;
  color: hsl(348, 94%, 15%);
}

&.score-check {
  background: #A7D8F0;
  color: hsl(200, 82%, 18%);
}
&.score-checkplus {
  background: #8EEDC7;
  color: hsl(170, 97%, 10%);
}
  &[disabled]{
    cursor: not-allowed;
  }

`;

const Link = styled(BaseLink)`
  color: inherit;
`;
const CalledStudent = styled.p`
  font-size: 3.2rem;
  text-align: center;
`;

const StudentRatingContainer = styled.div`
  margin-bottom: 2.4rem;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

const SectionHeading = styled.p`
  font-size: 3.2rem;
  text-align: center;
  margin:0 0 2.4rem;
`;

const CalledStudentScore = styled.div`

  border-radius: 15px;
  padding: .4rem .8rem;

&.score-none {
  background: #E4E7EB;
}

&.score-checkminus {
  background: #FF9B9B;
  color: hsl(348, 94%, 15%);
}

&.score-check {
  background: #A7D8F0;
  color: hsl(200, 82%, 18%);
}
&.score-checkplus {
  background: #8EEDC7;
  color: hsl(170, 97%, 10%);
}
`;

const EditButton = styled(BaseButton)`
  padding: 0;
  display: block;
  margin: 1.2rem 0;
`;

const getScoreInfo = (score) => {
  switch (score) {
    case null: {
      return {
        className: 'score-none',
        value: 'not scored'
      }
    }
    case 'check_minus': {
      return {
        className: 'score-checkminus',
        value: 'check minus'
      }
    }
    case 'check': {
      return {
        className: 'score-check',
        value: 'check'
      }
    }
    case 'check_plus': {
      return {
        className: 'score-checkplus',
        value: 'check plus'
      }
    }
    default: throw new Error(`Invalid score type of ${score} found.`);
  }
}

const Session = ({ session, ...props }) => {

  const [loadingMessage, setLoadingMessage] = React.useState(null);
  const [isEditingScore, setIsEditingScore] = React.useState(null);
  const sessionDispatch = useSessionDispatch();
  const { courses } = useCourseState();
  if (!session) return <div>Whoops, no session found</div>
  const calledStudent = session.calledStudents.length ? session.calledStudents[0] : {
    student: { name: 'Call a Student' }
  };
  const handleNextStudent = async () => {
    let studentList = session.remainingStudents.slice();
    let randomStudentIndex = getRandomArrayIdx(studentList.length);
    let [randomStudent] = studentList.splice(randomStudentIndex, 1);
    let calledStudents = [{ student: randomStudent, calledDate: new Date() }, ...session.calledStudents]
    // update the session state

    try {

      const { error } = await updateSession(sessionDispatch, {
        id: session.id,
        remainingStudents: studentList,
        calledStudents
      });

      if (error) throw new Error(error)
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  const handleStudentScore = async (e) => {
    // update the students score in the DB
    setLoadingMessage('Scoring Student...')
    const score = e.target.dataset.score;
    // update the current students info and send along the session info

    let updatedCalledStudents = session.calledStudents.map(seshScore => seshScore.calledDate === calledStudent.calledDate ? { ...seshScore, score } : seshScore);

    try {
      const { error } = await updateSession(sessionDispatch, { id: session.id, calledStudents: updatedCalledStudents }, session.status);
      if (error) throw new Error(JSON.stringify(error))
      setLoadingMessage(null)
    } catch (error) {
      console.log(error);
      setLoadingMessage(null)
    }
  }

  const handleCompleteSession = async () => {

    const { error } = await updateSession(sessionDispatch, { id: session.id, completedAt: new Date() }, 'COMPLETE');
    if (error) console.log('error completing session', JSON.stringify(error, null, 2));

  }

  const handleAddSession = async () => {
    const course = courses.find(c => c.id === session.course.id);
    const { error, session: newSession } = await createSession(sessionDispatch, session.course.id, course.students);
    if (error || newSession.error) {
      console.log('error creating session', error, newSession.error);
      return;
    }
    props.history.push(`/session/${newSession.id}`);
  }
  return (
    <>

      <nav>
        <Link to="/" style={{ margin: '0 1.2rem 0 0' }}>Dashboard</Link> &rarr;
            <p style={{ display: 'inline-block', margin: '0 0 0 1.2rem' }}> {session.course.name}</p>
      </nav>

      {!props.viewOnly && (
        <>
          <Section>
            <SectionContainer>
              <CalledStudent>{calledStudent.student.name}</CalledStudent>
              {!!session.calledStudents.length && (

                <ScoreStudent student={calledStudent} handleStudentScore={handleStudentScore} />

              )
              }
              {session.status === 'NEW' && <Button className="primary" onClick={handleNextStudent} disabled={session.status === 'COMPLETE' || loadingMessage}>
                Begin Session
        </Button>}
              {session.status === 'IN_PROGRESS' && !!session.remainingStudents.length && (
                <Button className="primary" onClick={handleNextStudent} disabled={loadingMessage}>
                  {loadingMessage || 'Next Student'}
                </Button>
              )}
              {session.remainingStudents.length === 0 && session.status !== 'COMPLETE' && (
                <Button className="primary" onClick={handleCompleteSession} disabled={loadingMessage}>
                  Complete Session
      </Button>
              )}
              {session.status === 'COMPLETE' && (
                <Button className="primary" onClick={handleAddSession} disabled={loadingMessage}>
                  Start New Session?
        </Button>
              )}
            </SectionContainer>
          </Section>
          <Section>
            <SectionContainer>
              <p style={{ textAlign: 'center' }}>Students Left: {session.remainingStudents.length}</p>
            </SectionContainer>
          </Section>
        </>
      )}

      {session.calledStudents.length > 0 && <Section>
        <SectionContainer>
          <SectionHeading>
            Called Students
          </SectionHeading>
          <ul >
            {session.calledStudents.map(({ student, score, calledDate }) => {
              const { className, value } = getScoreInfo(score);
              return (
                <li key={calledDate}>
                  <div>
                    <span>{student.name}</span>
                    <EditButton onClick={() => setIsEditingScore(isEditingScore ? null : calledDate)}>
                      {calledDate === isEditingScore ? 'done' : 'edit score'}
                    </EditButton>
                  </div>
                  {calledDate === isEditingScore ? (
                    <ScoreStudent student={{ score }} handleStudentScore={handleStudentScore} />
                  ) : (

                      <CalledStudentScore className={className}>
                        {value}
                      </CalledStudentScore>
                    )}
                </li>
              )
            })}
          </ul>
        </SectionContainer>
      </Section>}
    </>
  );
}

function ScoreStudent({ student: calledStudent, handleStudentScore }) {
  return (
    <StudentRatingContainer>
      <Button className={`secondary ${calledStudent.score === 'check_minus' ? 'score-checkminus' : ''}`} data-score="check_minus" onClick={handleStudentScore}> check minus</Button>
      <Button className={`secondary ${calledStudent.score === 'check' ? 'score-check' : ''}`} data-score="check" onClick={handleStudentScore}> check </Button>
      <Button className={`secondary ${calledStudent.score === 'check_plus' ? 'score-checkplus' : ''}`} data-score="check_plus" onClick={handleStudentScore}> check plus</Button>
    </StudentRatingContainer>
  )
}


export default Session;