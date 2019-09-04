import React from 'react';
import styled from '@emotion/styled';
import { Auth } from 'aws-amplify';
import { Input, Form, FormContainer, Title, Button } from './styled/Form';

const Container = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f9cd49;
  background-image: linear-gradient(151deg, #f9cd49 0%, #f55c0a 74%);
  padding: 4.8rem 2.4rem;
`;


export const SignIn = (props) => {
  return (
    <Container>

      <Title className="color-light">Already have an account?</Title>
      <p style={{ color: 'var(--color-white)', margin: '0', fontSize: '1.8rem', textAlign: 'center' }}>Glad you're back! <br />Please login with your personal info.</p>
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