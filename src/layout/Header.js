import React from 'react';
import styled from '@emotion/styled';
import { Auth } from 'aws-amplify';
import Container from './Container';
import Button from '../components/styled/Button';

const AppTitle = styled.a`
  color: #222;
  font-size: 3.2rem;
  text-decoration: none;
  font-weight: 800;
`;

const Logout = styled(Button)`
background: none;
border: none;
font-size: 1.6rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const Header = (props) => {

  return (<>
    <Container>
      <Wrapper>
        <AppTitle>Student Selector</AppTitle>
        <Logout onClick={async () => {
          try {
            await Auth.signOut();
          } catch (err) {
            console.error(err);
          }
        }}>Logout</Logout>
      </Wrapper>
    </Container>
  </>);
}

export default Header;