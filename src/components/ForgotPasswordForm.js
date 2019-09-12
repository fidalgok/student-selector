import React from 'react';
import { FormContainer, Form, Title, Input, Button } from './styled/Form';
import { IconError } from './styled/Icons';
import AlertError from './styled/AlertError';

const ForgotPasswordForm = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.forgotPassword();

  }
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} style={{ gridColumn: 'span 2' }}>
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
      </Form>
    </FormContainer>
  )

}

const UpdatePasswordForm = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitNewPassword()
      .then(() => props.setFormType('signIn'))
      .catch(error => console.log(error));
  }
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} style={{ gridColumn: 'span 2' }}>
        <Title className="color-dark">Password Reset</Title>
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
        <Button type="submit" className="primary">
          Submit
        </Button>
        {!!props.formError && (
          <AlertError style={{ marginTop: '1.6rem' }}><IconError style={{ display: 'inline-block', marginRight: '1rem' }} />{props.formError}</AlertError>
        )}
      </Form>
    </FormContainer>
  )
}

export { ForgotPasswordForm as default, UpdatePasswordForm };