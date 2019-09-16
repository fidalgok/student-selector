import React from 'react';
import { Auth } from 'aws-amplify';
import { FormContainer, Form, Title, Input, Button, Label } from './styled/Form';
import { ResetFormButtons } from './SignupForm';
import { IconError, IconInformation } from './styled/Icons';
import { InputDiv } from './styled/Input'
import AlertError from './styled/AlertError';
import AlertInfo from './styled/AlertInfo';


const ForgotPasswordForm = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.forgotPassword();

  }
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} style={{ gridColumn: 'span 2', borderTopRightRadius: '15px', borderBottomRightRadius: '15px', borderBottomLeftRadius: '15px' }}>
        <Title className="color-dark">Forgot Password</Title>

        <InputDiv style={{ maxWidth: '320px' }}>
          <label htmlFor="username">username</label>
          <input type="text" id="username" name="username" onChange={(e) => { e.persist(); props.updateFormState(e) }} />
        </InputDiv>
        <Button type="submit" className="primary">
          Submit
        </Button>
        {!!props.formError && (
          <>
            <AlertError style={{ marginTop: '1.6rem' }}><IconError style={{ display: 'inline-block', marginRight: '1rem' }} />{props.formError}</AlertError>
            <Button type="button" className="secondary" onClick={() => props.setFormType("signUp")}>Sign up?</Button>
          </>
        )}
        <ResetFormButtons>
          <span>Back to:</span>
          <Button type="button" className="secondary reset" onClick={() => { props.resetForm(); props.updateFormType('signUp') }}>Sign Up</Button>
          <Button type="button" className="secondary reset" onClick={() => { props.resetForm(); props.updateFormType('signIn') }}>Sign In</Button>
        </ResetFormButtons>
      </Form>
    </FormContainer>
  )

}

const UpdatePasswordForm = (props) => {
  const [resendCodeMessage, setResendCodeMessage] = React.useState('');
  const [formError, setFormError] = React.useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitNewPassword();
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} style={{ gridColumn: 'span 2', borderTopRightRadius: '15px', borderBottomRightRadius: '15px', borderBottomLeftRadius: '15px' }}>
        <Title className="color-dark">Password Reset</Title>
        <p style={{ marginTop: '0' }}>Check your email for a confirmation code.</p>
        <p style={{ marginTop: '0' }}>Need a new code? <span
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={
            async () => {
              try {
                await Auth.forgotPassword(props.username);
                setResendCodeMessage('Code sent, check your email again.')
              } catch (err) {
                console.log(err)
                setFormError('Username cannot be empty')
              }
            }

          }>Send me a new code</span></p>
        {!!resendCodeMessage.length && (
          <AlertInfo><IconInformation style={{ display: 'inline-block', marginRight: '1rem' }} />{resendCodeMessage}</AlertInfo>
        )}
        <InputDiv style={{ maxWidth: '320px' }}>

          <label htmlFor="username">username</label>
          <input
            name='username'
            id='username'
            onChange={e => { e.persist(); props.updateFormState(e) }}

            value={props.username || ''}
          />
        </InputDiv>
        <InputDiv style={{ maxWidth: '320px' }}>

          <label htmlFor="passwordResetCode">reset code</label>
          <input
            name='passwordResetCode'
            id='passwordResetCode'
            onChange={e => { e.persist(); props.updateFormState(e) }}

          />
        </InputDiv>
        <InputDiv style={{ maxWidth: '320px' }}>

          <label htmlFor="password">password</label>
          <input
            name='password'
            id='password'
            onChange={e => { e.persist(); props.updateFormState(e) }}

            type="password"
          />
        </InputDiv>
        <Button type="submit" style={{ width: '24rem' }} className="primary">
          Submit
        </Button>
        {(!!props.formError || !!formError) && (
          <AlertError style={{ marginTop: '1.6rem' }}><IconError style={{ display: 'inline-block', marginRight: '1rem' }} />{formError === null ? props.formError : formError}</AlertError>
        )}
        <ResetFormButtons>
          <span>Back to:</span>
          <Button type="button" className="secondary reset" onClick={() => { props.resetForm(); props.updateFormType('signUp') }}>Sign Up</Button>
          <Button type="button" className="secondary reset" onClick={() => { props.resetForm(); props.updateFormType('signIn') }}>Sign In</Button>
        </ResetFormButtons>
      </Form>
    </FormContainer>
  )
}

export { ForgotPasswordForm as default, UpdatePasswordForm };