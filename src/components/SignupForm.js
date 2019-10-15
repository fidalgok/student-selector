import React from 'react';
import styled from '@emotion/styled';
import { Auth } from 'aws-amplify';
import { Input, Form, FormContainer, Title, Button, Label } from './styled/Form';
import { InputDiv } from './styled/Input';
import AlertErrorBase from './styled/AlertError';
import AlertInfo from './styled/AlertInfo';
import { IconError, IconInformation } from './styled/Icons';
const Container = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f9cd49;
  background-image: linear-gradient(to bottom, hsl(47, 10%, 28%), hsl(40, 10%, 18%));
  padding: 4.8rem 2.4rem;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  @media (max-width: 650px){
    border-bottom-left-radius: 15px;
    border-top-right-radius: 0px;
  }
`;

const AlertError = styled(AlertErrorBase)`
  margin-top: 1.6rem;
  display: flex;
`;

export const ResetFormButtons = styled.div`
 margin-top: 1.2rem;
 button.reset, span {
  color: var(--color-neutral-6);
  font-weight: normal;
  padding: 1.2rem 1rem;
 }
`;

export const SignIn = (props) => {
  return (
    <Container>

      <Title className="color-light">Already have an account?</Title>
      <p style={{ color: 'var(--color-white)', fontSize: '1.8rem', textAlign: 'center' }}>Glad you're back! <br />Please login with your personal info.</p>
      <Button
        className='invert-color'
        onClick={() => props.updateFormType('signIn')}
      >Sign In</Button>
    </Container>
  )
}

function ConfirmSignUp(props) {
  const [resendCodeMessage, setResendCodeMessage] = React.useState('');
  return (
    <Form
      onSubmit={(e) => { e.preventDefault(); props.confirmSignUp() }}
      style={{ gridColumn: 'span 2', borderTopRightRadius: '15px', borderBottomRightRadius: '15px', borderBottomLeftRadius: '15px' }}
    >
      <Title className="color-dark">You've got mail!</Title>
      <p style={{ marginTop: '0' }}>Check your email for a confirmation code.</p>
      <p style={{ marginTop: '0' }}>Didn't receive a code? <span
        style={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={
          async () => {
            try {
              await Auth.resendSignUp(props.username);
              setResendCodeMessage('Code sent, check your email again.')
            } catch (err) {
              console.error(err);
            }
          }

        }>Send me a new code</span></p>
      {!!resendCodeMessage.length && (
        <AlertInfo><IconInformation style={{ display: 'inline-block', marginRight: '1rem' }} />{resendCodeMessage}</AlertInfo>
      )}
      <InputDiv style={{ maxWidth: '320px', margin: '1.2rem auto' }}>

        <label htmlFor="confirmationCode">code</label>
        <input
          name='confirmationCode'
          id='confirmationCode'

          onChange={e => { e.persist(); props.updateFormState(e) }}

        />
      </InputDiv>
      <Button type='submit' style={{ width: '24rem' }}>
        Confirm Sign Up
      </Button>
      <ResetFormButtons>
        <span>Back to:</span>
        <Button type="button" className="secondary reset" onClick={() => { props.resetForm(); props.updateFormType('signUp') }}>Sign Up</Button>
        <Button type="button" className="secondary reset" onClick={() => { props.resetForm(); props.updateFormType('signIn') }}>Sign In</Button>
      </ResetFormButtons>
      {!!props.formError && (
        <AlertError style={{ marginTop: '1.6rem' }}><IconError style={{ display: 'inline-block', marginRight: '1rem' }} />{props.formError}</AlertError>
      )}
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

        <Form onSubmit={handleSubmit} >
          <Title className="color-dark">Sign Up</Title>
          <InputDiv>
            <label htmlFor="username">username</label>
            <input
              name='username'
              id='username'
              onChange={e => { e.persist(); props.updateFormState(e) }}

            />
          </InputDiv>
          <InputDiv>
            <label htmlFor="password">password</label>
            <input
              type='password'
              name='password'
              id="password"
              onChange={e => { e.persist(); props.updateFormState(e) }}

            />
          </InputDiv>
          <InputDiv>
            <label htmlFor="email">email</label>
            <input
              name='email'
              id='email'
              onChange={e => { e.persist(); props.updateFormState(e) }}

            />
          </InputDiv>
          <Button type="submit">Sign Up</Button>

          {!!props.formError && (
            <AlertError style={{ marginTop: '1.6rem' }}><IconError style={{ display: 'inline-block', marginRight: '1rem' }} />{props.formError}</AlertError>
          )}
        </Form>
      )}

      {props.formType !== 'confirmSignUp' && <SignIn updateFormType={props.updateFormType} />}
    </FormContainer>
  );
}

export default SignUpForm;