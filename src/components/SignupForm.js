import React from 'react';
import styled from '@emotion/styled';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 768px;
  background: white;
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

  &:focus {
    outline: none;
    border-bottom: 2px inset hsl(245, 85%, 70%);
  }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: hsl(245, 95%, 65%);
  padding: 3.2rem 1.2rem;
`;

const Button = styled.button`
  color: white;
  background-color: hsl(245, 85%, 65%);
  border: none;
  border-radius: 5px;

`;

export const SignUp = ({ signUp, updateFormState }) => {
  return (
    <Container>

      <Title className="color-light">Hello, Friend!</Title>
      <p style={{ color: 'white' }}>Enter your information to start calling your students!</p>
    </Container>
  )
}
export const SignIn = (props) => {
  return (
    <Container>

      <Title className="color-light">Welcome Back!</Title>
      <p style={{ color: 'white' }}>Glad you're here! Please login with your personal info.</p>
    </Container>
  )
}

function ConfirmSignUp(props) {
  return (
    <Form onSubmit={(e) => { e.preventDefault(); props.confirmSignUp() }}>
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
    console.log('about to submit the form')
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

      <SignIn />
    </FormContainer>
  );
}

export default SignUpForm;