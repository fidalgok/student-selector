import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import BaseButton from './styled/Button';
import { deleteCourse, formatDate, createSession } from '../utils';
import { useSessionDispatch, useSessionState } from '../sessionContext';

const CourseContainer = styled.section`

  border: 1px solid var(--color-neutral-2);
  box-shadow: 0 2px 4px rgba(0,0,0,.22);
  box-shadow: 0 4px 8px rgba(0,0,0,.08);
  border-radius: 15px;
  background: var(--color-neutral-1);

  margin-bottom: 2.4rem;
  @media (max-width: 750px){
    padding-bottom: 2.4rem;
    border-radius: 0;

  }
  & > * {
    padding: 2.4rem;

    @media (max-width: 750px){
      padding: 0;
    }
  }
`;

const Button = styled(BaseButton)`
  margin-right: 1.2rem;
  text-decoration:none;
  &.header-secondary{
    color:var(--color-black);
    text-decoration: underline;
    padding-left: 0;
    padding-right: 0;
    font-weight: normal;
    &:hover{

      background: var(--color-neutral-2);
    }
  &.header-danger{
    color: var(--color-black);
    &:hover{
      background: var(--color-neutral-2);
    }
  }
    @media (max-width: 520px){
      margin:0;
    }
  }
  &.session-results{
    padding: 0;
    text-decoration:underline;
    font-weight: normal;
  }
`;

const CourseActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  border-bottom: 2px solid var(--color-neutral-2);
  color: var(--color-black);
  background: var(--color-neutral-2);
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  @media (max-width: 750px){
    padding: 1.2rem;
    margin-bottom: 4.2rem;
  }

  @media (max-width: 520px){
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 3.2rem;

  }
`;
const CourseInfo = styled.div`
  @media (max-width: 520px){
    display: flex;
    align-items: center;
  }
`;
const CourseButtons = styled.div`
  @media (max-width: 520px){
    margin-top: 1.2rem;
    display: flex;
  }
`;
const CourseTitle = styled.p`
  font-size: 3.2rem;
  margin:0;

`;

const StudentInfo = styled.div`
  color: var(--color-neutral-8);
  font-size: 1.2rem;
  @media (max-width: 520px){
    margin-left: 1.2rem;
  }
`;

const SessionListContainer = styled.div`
  display: grid;
  grid-auto-flow: row dense;
  grid-gap: 2.4rem;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  grid-auto-rows: 1fr;
  ;
`;

const StyledList = styled.ul`
  list-style: none;
  margin:0;
  padding: 0;
  max-height: 24rem;
  overflow-x: auto;
  position: relative;
  border: 1px solid var(--color-neutral-2);
  border-top: 8px solid var(--color-secondary-5);
  border-radius: 5px;
  @media (max-width: 750px){
    margin: 0 1rem;
  }
  h3 {
    margin:0 0 1.2rem;
    position: sticky;
    top: 0;
    left:0;
    background: var(--color-neutral-1);
    box-shadow: 0px 2px 4px hsla(43, 13%, 90%, .5);
    padding: .8rem;
  }
`;

const ListItem = styled.li`

  padding: 1.6rem .8rem;
  display: flex;
  flex-direction: column;

  &:nth-child(odd){
    background: var(--color-neutral-2);
  }
`;

const SessionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: .8rem;
  span.status{
    border-radius: 25px;
    font-size: 1.2rem;
    background: var(--color-secondary-2);
    color: var(--color-secondary-10);
    padding: 0 1.2rem;

    &.complete{
      background: #8EEDC7;
      color: hsl(170, 97%, 10%);
    }
  }
  span.date{
    margin-right: 1.2rem;
    font-size: 1.2rem;
  }

`;

const SessionHeader = ({ createdAt = new Date(), status = 'NEW' }) => {
  const formattedDate = formatDate(new Date(createdAt));
  return (
    <HeaderContainer>
      <span className="date">Started on: {formattedDate}</span>
      <span className={status === 'COMPLETE' ? `status complete` : 'status'}>{status.toLowerCase()}</span>
    </HeaderContainer>
  )
}

const SessionsList = ({ activeSession, completedSessions, handleAddSession }) => {

  const renderSessions = () => {
    return (
      <>
        {!activeSession && (
          <StyledList>
            <h3>Active Session</h3>
            <ListItem>
              <SessionInfo>
                This course does not have any active sessions.
                <Button
                  className="primary"
                  onClick={handleAddSession}
                >
                  Create Session
                </Button>
              </SessionInfo>
            </ListItem>
          </StyledList>
        )}
        {activeSession && (
          <StyledList>
            <h3>Active Session:</h3>
            <ListItem key={activeSession.id}>
              <SessionHeader
                createdAt={activeSession.createdAt}
                status={activeSession.status}
              />
              <SessionInfo>
                <Button className="primary" as={Link} to={`/session/${activeSession.id}`}>Resume Session</Button>
                <span style={{ margin: '1.2rem 0' }}>Remaining Students: {activeSession.remainingStudents.length}</span>
                <span>Called Students: {activeSession.calledStudents.length}</span>
              </SessionInfo>
            </ListItem>
          </StyledList>
        )}


        {completedSessions.length ? (<>
          <StyledList>
            <h3>Completed Sessions</h3>


            {completedSessions.map(session => (
              <ListItem key={session.id}>
                <SessionHeader createdAt={session.createdAt} status={session.status} />
                <SessionInfo>
                  <Button as={Link} to={{ pathname: `/session/${session.id}`, state: { viewOnly: true } }} className="session-results">View Results</Button>
                </SessionInfo>
              </ListItem>
            ))}
          </StyledList>
        </>) : (
            <StyledList>
              <h3>Completed Sessions</h3>
              <ListItem>
                <SessionInfo>
                  No sessions complete.
              </SessionInfo>
              </ListItem>

            </StyledList>
          )}
      </>


    )
  }

  return renderSessions();
}

const CourseCard = ({ course, ...props }) => {
  const sessionDispatch = useSessionDispatch();
  const { sessions } = useSessionState();
  const courseSessions = sessions.filter(sesh => sesh.course.id === course.id);
  const activeSession = courseSessions.find(sesh => sesh.status === 'NEW' || sesh.status === 'IN_PROGRESS');
  const completedSessions = courseSessions.filter(sesh => sesh.status === 'COMPLETE');
  const handleDelete = async () => {
    await deleteCourse(course.id);
    props.deleteCourse(course.id);
  }

  const handleAddSession = async () => {

    const { error, session } = await createSession(sessionDispatch, course.id, course.students);
    if (error) {
      console.log('error creating session', error);
      return;
    }
    props.history.push(`/session/${session.id}`);
  }

  return (
    <CourseContainer key={course.id}>
      <CourseActions>
        <CourseInfo>
          <CourseTitle>{course.name}</CourseTitle>
          <StudentInfo>
            {course.students.length} students
          </StudentInfo>
        </CourseInfo>
        <CourseButtons>

          {!activeSession && <Button
            className="primary"
            onClick={handleAddSession}
          >New Session</Button>}

          <Button className="header-secondary" as={Link} to={`/course/${course.id}/edit`}>Manage Students</Button>
          {!courseSessions.length && <Button onClick={handleDelete} className="header-danger">Delete Course</Button>}
        </CourseButtons>
      </CourseActions>


      <SessionListContainer>
        <SessionsList
          courseId={course.id}
          activeSession={activeSession}
          completedSessions={completedSessions}
          handleAddSession={() => handleAddSession()}
        />
      </SessionListContainer>
    </CourseContainer>);
}

export default CourseCard;