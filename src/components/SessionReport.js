import React from 'react';
import Papa from 'papaparse'
import { formatDate } from '../utils';
import Button from './styled/Button';
import VisuallyHidden from '@reach/visually-hidden';

const SessionReport = (props) => {
  // a hidden link that will be used to generate a report of scores to be downloaded
  const hiddenEl = React.useRef(null);

  const handleClick = () => {
    const csvData = Papa.unparse(props.studentData, {
      delimiter: ',',
      header: true,
    })
    const encodedData = encodeURI(csvData);
    hiddenEl.current.href = 'data:text/csv;charset=utf-8,' + encodedData;
    hiddenEl.current.download = `${formatDate(new Date(), '-')}-${props.courseName}.csv`;
    hiddenEl.current.click();

  }
  return (
    <>
      <VisuallyHidden>
        <a tabIndex='-1' style={{ outline: 'none' }} ref={hiddenEl} aria-hidden="true">Session Report</a>
      </VisuallyHidden>
      <Button onClick={handleClick}>Download Session Report</Button>
    </>
  );
}

export default SessionReport;