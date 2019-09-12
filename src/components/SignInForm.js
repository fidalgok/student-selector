import React from 'react';
import styled from '@emotion/styled';
import { FormContainer, Form, Input, Button, Title } from './styled/Form'
import { IconError } from './styled/Icons';
import AlertError from './styled/AlertError';

const Container = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items:center;
  background-color: #f9cd49;
  background-image: linear-gradient(to bottom, hsl(47, 10%, 28%), hsl(40, 10%, 18%));
  padding: 4.8rem 2.4rem;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const ResetButton = styled(Button)`
  background: none;
  color: var(--color-neutral-8);
  text-decoration: underline;
  padding: 0;
  display: inline;
  font-weight:normal;
`;

const SignUp = (props) => {
  return (
    <Container>
      <Title className="color-light">Hello Friend!</Title>
      <p style={{ color: 'var(--color-white)', margin: '0', fontSize: '1.8rem', textAlign: 'center' }}>Need an account? <br />Enter your information to start calling your students!</p>
      <Button
        className="invert-color"
        onClick={props.updateFormType}
      >Sign Up</Button>
    </Container>
  )
}

const SignInForm = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn();
  }
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title className="color-dark">Sign In</Title>
        <Input
          name='username'
          onChange={e => { e.persist(); props.updateFormState(e) }}

          placeholder='username'
        />
        <Input
          type='password'
          name='password'
          onChange={e => { e.persist(); props.updateFormState(e) }}

          placeholder='password'
        />
        <Button onClick={props.signIn} className="primary">
          Sign In
        </Button>
        {!!props.formError && (
          <AlertError style={{ marginTop: '1.6rem' }}><IconError style={{ display: 'inline-block', marginRight: '1rem' }} />{props.formError}</AlertError>
        )}
        <div style={{ textAlign: 'center', marginTop: '1.6rem' }}>
          <p>Forgot your password? <ResetButton onClick={() => props.setFormType('forgotPassword')}>Reset your password here.</ResetButton></p>
        </div>
      </Form>
      <SignUp updateFormType={props.updateFormType} />
    </FormContainer>
  )

}

export default SignInForm;

