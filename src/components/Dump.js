import React from 'react';

const Dump = ({ json }) => {
  return (
    <pre>
      <code>
        {JSON.stringify(json, null, 2)}
      </code>
    </pre>
  );
}

export default Dump;