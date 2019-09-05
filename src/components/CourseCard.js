import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import BaseButton from './styled/Button';
import { deleteCourse } from '../utils';

const CourseContainer = styled.section`
  padding: 0 0 2.4rem 0;
  border-bottom: 1px solid var(--color-neutral-2);
`;

const Button = styled(BaseButton)`
  margin-right: 1.2rem;
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
`;

const SessionInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SessionsList = (props) => {

  const renderSessions = () => {
    return (
      <StyledList>
        {!props.activeSession && !!props.completedSessions.length && (
          <ListItem>
            <SessionInfo>
              This course does not have any sessions.
            </SessionInfo>
          </ListItem>
        )}
        {props.activeSession && (<ListItem key={props.activeSession.id}>
          <span>Status</span><span>{props.activeSession.status}</span>
          <span>Remaining Students: </span><span>{props.activeSession.remainingStudents.length}</span>
          <span>Called Students: </span><span>{props.activeSession.calledStudents.length}</span>
        </ListItem>)}
        {props.completedSessions.length ? props.completedSessions.map(session => (
          <ListItem key={session.id}>
            <span>Status</span><span>{session.status}</span>
            <span>Remaining Students: </span><span>{session.remainingStudents.length}</span>
            <span>Called Students: </span><span>{session.calledStudents.length}</span>
          </ListItem>
        )) : null}

      </StyledList>

    )
  }

  return renderSessions();
}

const CourseCard = ({ course, ...props }) => {
  const activeSession = course.sessions.items.find(sesh => sesh.status === 'IN_PROGRESS' || 'NEW');
  const completedSessions = course.sessions.items.filter(sesh => sesh.status === 'COMPLETE');

  const handleDelete = async () => {
    await deleteCourse(course.id);
    props.deleteCourse(course.id);
  }
  const handleAddSession = async () => {

  }
  return (<CourseContainer key={course.id}>
    <CourseActions>
      <CourseTitle>{course.name}</CourseTitle>
      <Button className="primary">{!!activeSession ? 'Resume Session' : 'New Session'}</Button>
      <Button className="secondary" as={Link} to={`/course/${course.id}/edit`}>Manage Students</Button>
      {!course.sessions.items.length && <Button onClick={handleDelete} className="danger">Delete Course</Button>}
    </CourseActions>
    <StudentInfo>
      {course.students.length} students
    </StudentInfo>

    <div>
      <SessionsList completedSessions={completedSessions} activeSession={activeSession} />
    </div>
  </CourseContainer>);
}

export default CourseCard;