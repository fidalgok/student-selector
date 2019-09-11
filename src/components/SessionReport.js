import React from 'react';
import Papa from 'papaparse'

const SessionReport = (props) => {
  const hiddenEl = React.useRef(null);

  const handleClick = () => {
    const csvData = Papa.unparse(props.studentData, {
      delimiter: ',',
      header: true,
    })
    // const encodedData = encodeURI(csvData)
    //hiddenEl.href = 'data:text/csv;charset=utf-8,' + encodedData;
    //hiddenEl.download = 'test.csv'
    //hiddenEl.click()

  }
  return ('A session report will be downloaded shortly');
}

export default SessionReport;