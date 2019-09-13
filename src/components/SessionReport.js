import React from 'react';
import Papa from 'papaparse'
import { Link } from 'react-router-dom';
import { formatDate } from '../utils';
import Button from './styled/Button';
import VisuallyHidden from '@reach/visually-hidden';
import { useSessionState } from '../sessionContext';

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
        console.log({ curSesh, prevSesh });
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
    console.log(studentData);
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
        Reports for course: {course.name}
        <div>
          <label htmlFor="report-type-complete">Completed Sessions</label>
          <input type="radio" id="report-type-complete" name="report-type" value="complete" checked={reportType === 'complete'} onChange={handleChange} />
          <label htmlFor="report-type-all">All Sessions</label>
          <input type="radio" id="report-type-all" name="report-type" value="all" checked={reportType === 'all'} onChange={handleChange} />
        </div>
      </div>

      <VisuallyHidden>
        <a tabIndex='-1' style={{ outline: 'none' }} ref={hiddenEl} aria-hidden="true">Session Report</a>
      </VisuallyHidden>
      <Button onClick={handleClick}>Download Session Report</Button>
    </>
  );
}

export default SessionReport;