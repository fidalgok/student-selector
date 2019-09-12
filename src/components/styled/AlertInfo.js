import React from 'react';
import styled from '@emotion/styled';

const Div = styled.div`
  color: var(--color-secondary-10);
  background: var(--color-secondary-2);
  border-radius: 5px;
  padding: 4px 1rem;
  border: 1px solid var(--color-secondary-4);
`;

const AlertInfo = (props) => {
  return (<Div>{props.children}</Div>);
}

export default AlertInfo;