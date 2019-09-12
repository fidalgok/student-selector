import React from 'react';
import styled from '@emotion/styled';

const Div = styled.div`
  color: var(--color-red-10);
  background: var(--color-red-2);
  border-radius: 5px;
  padding: 4px 1rem;
  border: 1px solid var(--color-red-4);
  display: flex;
`;

const AlertError = (props) => {
  return (<Div {...props}>{props.children}</Div>);
}

export default AlertError;