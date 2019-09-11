import React from 'react';
import papa from 'papaparse';

const ImportStudents = ({
  onSubmitStudents = () => { },
  onError = (error) => { console.log(JSON.stringify(error, null, 2)) },
  currentStudents
}) => {
  const [error, setError] = React.useState(null);
  const [studentImports, setStudentImports] = React.useState([]);
  const [showPreview, setShowPreview] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleUpload = () => {
    onSubmitStudents([...studentImports, ...currentStudents]);
    inputRef.current.value = '';
    setStudentImports([]);
    if (showPreview) setShowPreview(false);
  }

  const handleFileChange = e => {
    let reader = new FileReader();
    if (e.target.files.length > 0) {
      let uploadedFile = e.target.files[0];
      const filename = uploadedFile.name;

      reader.onload = event => {
        const csvData = papa.parse(event.target.result, {
          header: true,
          delimiter: ',',
        });
        const regEx = /student name|studentname|student_name/i;

        const headers = Object.getOwnPropertyNames(csvData.data[0]);
        const studentNameIdx = headers.findIndex(el => el.match(regEx));
        if (studentNameIdx !== -1) {
          // file has the info we're looking for set it up for adding to the course model and send it back
          const studentImportList = csvData.data.map(row => ({ name: row[headers[studentNameIdx]] }));
          setStudentImports(studentImportList);

        } else {
          // couldn't find a student name column, let the user know
          setError('No "student name" column found. Please add one and try again.');
          e.target.value = '';
        }
      }
      reader.onerror = event => {
        onError(event);
        setError(JSON.stringify(event.data));
      }

      // triggers the onload event
      reader.readAsText(uploadedFile, 'UTF-8')
    }
  }
  return (
    <div style={{ marginBottom: '2.4rem' }}>
      <p>Or upload a .csv file with a column header of one of the following: </p>
      <ul style={{ margin: '1.6rem 0', padding: 0 }}>
        <p>Please note all column names are case insensitive</p>
        <li style={{ margin: '0 1.6rem' }} > student name</li>
        <li style={{ margin: '0 1.6rem' }} > studentname</li>
        <li style={{ margin: '0 1.6rem' }} > student_name</li>
      </ul>
      <label htmlFor="students-import">Import Students</label>
      {error ? <p>{error}</p> : null}
      <input
        type="file"
        accept=".csv, text/csv"
        id="students-import"
        onChange={handleFileChange}
        onError={handleFileChange}
        ref={inputRef}
      />
      {!!studentImports.length && (
        <div>
          <p>attempting to upload {studentImports.length} students. <button onClick={() => setShowPreview(!showPreview)}>preview import</button><button onClick={handleUpload}>add to course</button></p>
          {showPreview && (
            <ul style={{ margin: '1.6rem 0', padding: 0 }}>
              {studentImports.map((student, i) => (
                <li key={i} style={{ margin: '0 1.6rem' }} > {student.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default ImportStudents;
