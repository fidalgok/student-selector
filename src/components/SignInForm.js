import React from 'react';
import { FormContainer, Form, Input, Button, Title, SignUp } from './SignupForm'



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
      </Form>
      <SignUp updateFormType={props.updateFormType} />
    </FormContainer>
  )

}

export default SignInForm;

