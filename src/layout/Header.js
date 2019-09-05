import React from 'react';
import styled from '@emotion/styled';
import { Auth } from 'aws-amplify';
import Container from './Container';
import Button from '../components/styled/Button';

const HeaderContainer = styled(Container)`
  z-index: 999;

  color: var(--color-white);
`;

const AppTitle = styled.a`
  font-size: 3.2rem;
  text-decoration: none;
  font-weight: 800;
  color: inherit;

`;

const Logout = styled(Button)`
background: none;
border: none;
font-size: 1.6rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.5rem 4rem;
`;

const Header = (props) => {

  return (<>
    <HeaderContainer>
      <Wrapper>
        <AppTitle href='/'>Student Selector</AppTitle>
        <Logout onClick={async () => {
          try {
            await Auth.signOut();
          } catch (err) {
            console.error(err);
          }
        }}>Logout</Logout>
      </Wrapper>
    </HeaderContainer>
  </>);
}

export default Header;