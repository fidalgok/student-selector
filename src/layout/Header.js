import React from 'react';
import styled from '@emotion/styled';
import Container from './Container';

const AppTitle = styled.link`
  color: #222;
  font-size: 3.2rem;
  text-decoration: none;
  font-weight: 800;
`;

const Header = (props) => {

  return (<>
    <Container>
      <AppTitle>Student Selector</AppTitle>
    </Container>
  </>);
}

export default Header;