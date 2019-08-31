import React from 'react';
import styled from '@emotion/styled';
import { Auth } from 'aws-amplify'
import SignUpForm from './SignupForm';


const LoggedOut = (props) => {
  const [formType, setFormType] = React.useState('signUp');
  const [formState, updateFormState] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'updateFormState':
        return {
          ...state,
          [action.e.target.name]: action.e.target.value
        }
      default:
        return state;
    }
  }, {
      username: '',
      password: '',
      confirmationCode: '',
      email: '',

    });

  function renderForm() {
    switch (formType) {
      case 'signUp':
        return (
          <SignUpForm
            signUp={() => signUp(formState, setFormType)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        );
      case 'confirmSignUp':
        return (
          <SignUpForm
            formType={formType}
            confirmSignUp={() => confirmSignUp(formState, setFormType)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      default:
        return null;
    }
  }
  return (<>
    {renderForm()}
  </>);
}

async function signUp({ username, password, email }, setFormType) {
  try {
    await Auth.signUp({
      username, password, attributes: { email }
    })
    console.log('sign up success!')
    setFormType('confirmSignUp')
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function confirmSignUp({ username, confirmationCode, password }, setFormType) {
  try {
    await Auth.confirmSignUp(username, confirmationCode)
    console.log('confirm sign up success!')
    setFormType('signIn');
    await signIn({ username, password });
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function signIn({ username, password }) {
  try {
    await Auth.signIn(username, password)
    console.log('sign in success!')
  } catch (err) {
    console.log('error signing up..', err)
  }
}
export default LoggedOut;