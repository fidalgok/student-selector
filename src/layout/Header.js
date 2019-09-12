import React from 'react';
import styled from '@emotion/styled';
import { Auth } from 'aws-amplify';
import Container from './Container';
import Button from '../components/styled/Button';
import { AppLogo } from '../components/styled/Icons';

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
  @media (max-width: 750px){
    padding: 1.5rem 1.2rem;
  }
`;

const Header = (props) => {

  return (<>
    <HeaderContainer>
      <Wrapper>
        <div style={{ display: 'flex' }}>

          <AppLogo width="4.2rem" style={{ marginRight: '1rem' }} />
          <AppTitle href='/'>Student Selector</AppTitle>
        </div>
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