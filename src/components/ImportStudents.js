import React from 'react';
import papa from 'papaparse';

const ImportStudents = (props) => {
  return (<>
    <input type="file" accept="text/csv" />
  </>);
}

export default ImportStudents;

// const CSVReader = ({
//   accept = '.csv, text/csv',
//   cssClass = 'csv-reader-input',
//   cssInputClass = 'csv-input',
//   label,
//   onFileLoaded,
//   onError,
//   inputId = null,
//   inputStyle = {},
//   fileEncoding = 'UTF-8',
//   parserOptions = {}
// }) => {
//   let fileContent = undefined;

//   const handleChangeFile = e => {
//     let reader = new FileReader();
//     if (e.target.files.length > 0) {
//       const filename = e.target.files[0].name;

//       reader.onload = event => {
//         const csvData = PapaParse.parse(
//           event.target.result,
//           Object.assign(parserOptions, {
//             error: onError,
//             encoding: fileEncoding
//           })
//         );
//         onFileLoaded(csvData.data, filename);
//       };

//       reader.readAsText(e.target.files[0], fileEncoding);
//     }
//   };

//   return (
//     <div className={cssClass}>
//       {label && <label htmlFor={inputId}>{label}</label>}
//       <input
//         className={cssInputClass}
//         type="file"
//         id={inputId}
//         style={inputStyle}
//         accept={accept}
//         onChange={e => handleChangeFile(e)}
//       />
//     </div>
//   );
// };