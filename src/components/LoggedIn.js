import React from 'react';
import styled from '@emotion/styled';
import Header from '../layout/Header';
import Container from '../layout/Container';
import Router from '../Router';
import { CourseProvider } from '../courseContext'

export const AppContainer = styled(Container)`
  &::before {
    position: absolute;
    background: var(--color-neutral-10);
    z-index: -1;
    left: 0;
    top:0;
    display: block;
    content: " ";
    height: 27rem;
    width: 100%;
  }
`;

export const Main = styled.main`
  border-radius: 12px;
  background: var(--color-white);
  z-index: 1;
  padding: 4rem;
`;

const LoggedIn = (props) => {
  return (
    <CourseProvider>
      <Header />
      <AppContainer>
        <Main>
          <Router>
          </Router>
        </Main>
      </AppContainer>
    </CourseProvider>
  );
}

export default LoggedIn;