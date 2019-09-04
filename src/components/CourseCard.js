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
  margin-right: 1.2rem;
`;

const StudentInfo = styled.div`
  color: var(--color-neutral-5);
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
        {props.sessions.length ? props.sessions.map(session => (
          <ListItem key={session.id}>
            <span>Status</span><span>{session.status}</span>
            <span>Remaining Students: </span><span>{session.remainingStudents.length}</span>
            <span>Called Students: </span><span>{session.calledStudents.length}</span>
          </ListItem>
        )) : (<ListItem>
          <SessionInfo>
            No Sessions started, {' '}<Button className='secondary'>start a session?</Button>
          </SessionInfo>
        </ListItem>)
        }
      </StyledList>

    )
  }

  return renderSessions();
}

const CourseCard = ({ course, ...props }) => {
  const activeSession = course.sessions.items.find(sesh => sesh.status === 'IN_PROGRESS');
  const startedSessions = course.sessions.items.filter(sesh => sesh.status !== 'NEW');
  const handleDelete = async () => {
    deleteCourse(course.id);
    props.deleteCourse(course.id);
  }
  return (<CourseContainer key={course.id}>
    <CourseActions>
      <CourseTitle>{course.name}</CourseTitle>
      <Button className="primary">{!!activeSession ? 'Resume Session' : 'New Session'}</Button>
      <Button className="secondary" as={Link} to={`/course/${course.id}/edit`}>Manage Students</Button>
    </CourseActions>
    <StudentInfo>
      {course.students.length} students
    </StudentInfo>
    {!course.sessions.items.length && <Button onClick={handleDelete} className="danger">Delete Course</Button>}
    <div>
      <SessionsList sessions={startedSessions} />
    </div>
  </CourseContainer>);
}

export default CourseCard;