import React from 'react';
import { Auth } from 'aws-amplify';
import { FormContainer, Form, Title, Input, Button } from './styled/Form';
import { ResetFormButtons } from './SignupForm';
import { IconError, IconInformation } from './styled/Icons';
import AlertError from './styled/AlertError';
import AlertInfo from './styled/AlertInfo';


const ForgotPasswordForm = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.forgotPassword();

  }
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} style={{ gridColumn: 'span 2', borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>
        <Title className="color-dark">Forgot Password</Title>
        <Input
          name='username'
          onChange={e => { e.persist(); props.updateFormState(e) }}
          placeholder='username'
        />
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
      <Form onSubmit={handleSubmit} style={{ gridColumn: 'span 2', borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>
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

        <Input
          name='username'
          onChange={e => { e.persist(); props.updateFormState(e) }}
          placeholder='username'
          value={props.username}
        />
        <Input
          name='passwordResetCode'
          onChange={e => { e.persist(); props.updateFormState(e) }}
          placeholder='Reset Code'
        />
        <Input
          name='password'
          onChange={e => { e.persist(); props.updateFormState(e) }}
          placeholder='New Password'
          type="password"
        />
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