import React from 'react';
import Papa from 'papaparse'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils';
import Button from './styled/Button';
import VisuallyHidden from '@reach/visually-hidden';
import { useSessionState } from '../sessionContext';

const ReportInputs = styled.div`

margin-bottom: 1.2rem;

[type="radio"]{
  border: 0px;
    clip: rect(0px, 0px, 0px, 0px);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
}
[type="radio"]:checked ~ label,
[type="radio"]:not(:checked) ~ label
{
    position: relative;
    padding-left: 2.4rem;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid var(--color-neutral-4);
    border-radius: 100%;
    background: var(--color-white);
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    background: var(--color-secondary-6);
    position: absolute;
    top: 3px;
    left: 3px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
[type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}

label:not(:last-of-type){
  margin-right: 2.4rem;
}
`;

const SessionReport = ({ course, ...props }) => {
  const { sessions } = useSessionState();
  const [reportType, setReportType] = React.useState('complete');
  const courseSessions = sessions.filter(sesh => sesh.course.id === course.id);
  // a hidden link that will be used to generate a report of scores to be downloaded
  const hiddenEl = React.useRef(null);

  const handleChange = (e) => {
    setReportType(e.target.value)
  }

  const handleClick = () => {

    const studentData = courseSessions
      .filter(sesh => reportType === 'complete' ? sesh.status === 'COMPLETE' : sesh)
      .reduce((prevSesh, curSesh) => {

        const calledStudents = curSesh.calledStudents.map(score => {
          return {
            student_name: score.student.name,
            rating: score.score || 'not scored',
            session_completed_date: curSesh.status === 'COMPLETE' ? curSesh.completedAt || 'not found' : 'not complete',
            course_name: curSesh.course.name,
            session_status: curSesh.status
          }
        });
        const remainingStudents = curSesh.remainingStudents.map(student => {
          return {
            student_name: student.name,
            rating: 'not scored',
            session_completed_date: 'not complete',
            course_name: curSesh.course.name,
            session_status: curSesh.status
          }
        });
        const rows = [
          ...calledStudents,
          ...remainingStudents
        ];
        return [...prevSesh, ...rows];
      }, []);

    const csvData = Papa.unparse(studentData, {
      delimiter: ',',
      header: true,
    })
    const encodedData = encodeURI(csvData);
    hiddenEl.current.href = 'data:text/csv;charset=utf-8,' + encodedData;
    hiddenEl.current.download = `${formatDate(new Date(), '-')}-${course.name}-session-report.csv`;
    hiddenEl.current.click();

  }
  return (
    <>
      <nav>
        <Link to="/" style={{ margin: '0 1.2rem 0 0' }}>Dashboard</Link> &rarr;
            <p style={{ display: 'inline-block', margin: '0 0 0 1.2rem' }}> {course.name} Reports</p>
      </nav>
      <div>
        <h2>Reports for course: {course.name}</h2>
        <ReportInputs>


          <input type="radio" id="report-type-complete" name="report-type" value="complete" checked={reportType === 'complete'} onChange={handleChange} />

          <label htmlFor="report-type-complete">Completed Sessions</label>


          <input type="radio" id="report-type-all" name="report-type" value="all" checked={reportType === 'all'} onChange={handleChange} />

          <label htmlFor="report-type-all">All Sessions</label>
        </ReportInputs>
      </div>

      <VisuallyHidden>
        <a tabIndex='-1' style={{ outline: 'none' }} ref={hiddenEl} aria-hidden="true">Session Report</a>
      </VisuallyHidden>
      <Button className="primary" onClick={handleClick}>Download Session Report</Button>
    </>
  );
}

export default SessionReport;