import React from 'react';
import styled from '@emotion/styled';

const Div = styled.div`
  color: var(--color-blue-10);
  background: var(--color-blue-2);
  border-radius: 5px;
  padding: 4px 1rem;
  border: 1px solid var(--color-blue-4);
`;

const AlertSuccess = (props) => {
  return (<Div>{props.children}</Div>);
}

export default AlertSuccess;