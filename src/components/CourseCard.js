import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import BaseButton from './styled/Button';
import { deleteCourse, formatDate, createSession } from '../utils';
import { useCourseDispatch } from '../courseContext';

const CourseContainer = styled.section`
  padding: 2.4rem 0 0 0;
  border-bottom: 1px solid var(--color-neutral-2);
`;

const Button = styled(BaseButton)`
  margin-right: 1.2rem;
  text-decoration:none;
`;

const CourseActions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CourseTitle = styled.p`
  font-size: 2.4rem;
  margin:0;
  margin-right: 4.8rem;
`;

const StudentInfo = styled.div`
  color: var(--color-neutral-8);
  font-size: 1.2rem;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2.4rem 0;
`;

const ListItem = styled.li`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const SessionInfo = styled.div`
  margin-top: 1.2rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;;
  align-items: center;

  span.status{
    border-radius: 25px;
    font-size: 1.2rem;
    background: var(--color-neutral-2);
    color: var(--color-neutral-10);
    padding: 0 1.2rem;
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
      <span className="status">{status.toLowerCase()}</span>
    </HeaderContainer>
  )
}

const SessionsList = (props) => {

  const renderSessions = () => {

    return (
      <StyledList>
        {!props.activeSession && !props.completedSessions.length && (
          <ListItem>
            <SessionInfo>
              This course does not have any active sessions.
            </SessionInfo>
          </ListItem>
        )}
        {props.activeSession && (
          <ListItem key={props.activeSession.id}>

            <SessionHeader
              createdAt={props.activeSession.createdAt}
              status={props.activeSession.status}
            />
            <SessionInfo>
              <Button className="secondary" as={Link} to={`/course/${props.courseId}/session`}>Resume Session</Button>
              <span>Remaining Students: </span><span style={{ marginRight: '1.2rem' }}>{props.activeSession.remainingStudents.length}</span>
              <span>Called Students: </span><span style={{ marginRight: '1.2rem' }}>{props.activeSession.calledStudents.length}</span>
            </SessionInfo>
          </ListItem>)}
        {props.completedSessions.length ? props.completedSessions.map(session => (
          <ListItem key={session.id}>
            <SessionInfo>

              <SessionHeader createdAt={session.createdAt} status={session.status} />
              <span>Remaining Students: </span><span>{session.remainingStudents.length}</span>
              <span>Called Students: </span><span>{session.calledStudents.length}</span>
            </SessionInfo>
          </ListItem>
        )) : null}

      </StyledList>

    )
  }

  return renderSessions();
}

const CourseCard = ({ course, ...props }) => {
  const courseDispatch = useCourseDispatch();
  const activeSession = course.sessions.find(sesh => sesh.status === 'IN_PROGRESS' || 'NEW');
  const completedSessions = course.sessions.filter(sesh => sesh.status === 'COMPLETE');

  const handleDelete = async () => {
    await deleteCourse(course.id);
    props.deleteCourse(course.id);
  }
  const handleAddSession = async () => {
    const { error } = await createSession(courseDispatch, course.id, course.students);
    if (error) {
      console.log('error creating session', error);
      return;
    }
    props.history.push(`/course/${course.id}/session`);
  }
  return (<CourseContainer key={course.id}>
    <CourseActions>
      <CourseTitle>{course.name}</CourseTitle>
      {!activeSession && <Button
        className="primary"
        onClick={handleAddSession}
      >New Session</Button>}

      <Button className="secondary" as={Link} to={`/course/${course.id}/edit`}>Manage Students</Button>
      {!course.sessions.length && <Button onClick={handleDelete} className="danger">Delete Course</Button>}
    </CourseActions>
    <StudentInfo>
      {course.students.length} students
    </StudentInfo>

    <div>
      <SessionsList completedSessions={completedSessions} activeSession={activeSession} courseId={course.id} />
    </div>
  </CourseContainer>);
}

export default CourseCard;