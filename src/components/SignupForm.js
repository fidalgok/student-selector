import React from 'react';
import styled from '@emotion/styled';
import { Auth } from 'aws-amplify';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 32rem 32rem;
  background: white;
  min-height: 100vh;
  align-content:center;
  justify-content: center;
  margin: auto;
`;

export const Title = styled.p`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 2.4rem;

  &.color-light {
    color: white;
  }

  &.color-dark {
    color: #222;
  }
`;

export const Input = styled.input`
  padding: 1rem 4px;
  border-radius: 5px;
  background-color: hsl(245, 15%, 90%);
  border: none;
  margin-bottom: 1.2rem;
  width: 24rem;
  border-bottom: 2px inset hsla(245, 85%, 70%, 0);
  &:focus {
    outline: none;
    border-bottom: 2px inset hsl(245, 85%, 70%);
  }
`;

const Container = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  background: hsl(245, 95%, 65%);
  padding: 2.4rem;
`;

export const Button = styled.button`
  color: white;
  background-color: hsl(245, 85%, 65%);
  border: none;
  border-radius: 5px;
  padding: 1.2rem 2.4rem;

  &.invert-color {
    color: hsl(245, 85%, 65%);
    background-color: white;
  }
`;

export const SignUp = (props) => {
  return (
    <Container>
      <Title className="color-light">Hello Friend!</Title>
      <p style={{ color: 'white' }}>Need an account? Enter your information to start calling your students!</p>
      <Button
        className="invert-color"
        onClick={props.updateFormType}
      >Sign Up</Button>
    </Container>
  )
}

export const SignIn = (props) => {
  return (
    <Container>

      <Title className="color-light">Already have an account?</Title>
      <p style={{ color: 'white' }}>Glad you're back! Please login with your personal info.</p>
      <Button
        className='invert-color'
        onClick={props.updateFormType}
      >Sign In</Button>
    </Container>
  )
}

function ConfirmSignUp(props) {
  return (
    <Form
      onSubmit={(e) => { e.preventDefault(); props.confirmSignUp() }}
      style={{ gridColumn: 'span 2' }}
    >
      <Title className="color-dark">You've got mail!</Title>
      <p>Check your email for a confirmation code.</p>
      <p>Didn't receive a code? <span onClick={
        async () => {
          try {
            await Auth.resendSignUp(props.username)
          } catch (err) {
            console.error(err);
          }
        }

      }>Send me a new code</span></p>
      <Input
        name='confirmationCode'
        placeholder='Confirmation Code'
        onChange={e => { e.persist(); props.updateFormState(e) }}

      />
      <Button>
        Confirm Sign Up
      </Button>
    </Form>
  )
}

const SignUpForm = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signUp();
  }
  return (
    <FormContainer>
      {props.formType === "confirmSignUp" ? <ConfirmSignUp {...props} /> : (

        <Form onSubmit={handleSubmit}>
          <Title className="color-dark">Sign Up</Title>
          {/* inputs, forgot password, signin button */}
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
          <Input
            name='email'
            onChange={e => { e.persist(); props.updateFormState(e) }}
            placeholder='email'
          />
          <Button type="submit">Sign Up</Button>
        </Form>
      )}

      {props.formType !== 'confirmSignUp' && <SignIn updateFormType={props.updateFormType} />}
    </FormContainer>
  );
}

export default SignUpForm;