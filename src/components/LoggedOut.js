import React from 'react';
import { Auth } from 'aws-amplify'
import SignUpForm from './SignupForm';
import SignInForm from './SignInForm';
import ForgotPasswordForm, { UpdatePasswordForm } from './ForgotPasswordForm';


const LoggedOut = (props) => {
  const [formType, setFormType] = React.useState('signIn');
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
            updateFormType={() => setFormType('signIn')}
          />
        );
      case 'confirmSignUp':
        return (
          <SignUpForm
            formType={formType}
            username={formState.username}
            confirmSignUp={() => confirmSignUp(formState, setFormType)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
            updateFormType={() => setFormType('signIn')}
          />
        );
      case 'signIn':
        return (
          <SignInForm
            setFormType={setFormType}
            signIn={() => signIn(formState)}
            updateFormState={e => updateFormState({
              type: 'updateFormState', e
            })}
            updateFormType={() => setFormType('signUp')}
          />
        )
      case 'forgotPassword':
        return (
          <ForgotPasswordForm
            setFormType={setFormType}
            forgotPassword={() => forgotPassword(formState.username)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      case 'forgotPasswordSubmit':
        return (
          <UpdatePasswordForm
            username={formState.username}
            submitNewPassword={() => forgotPasswordSubmit(formState.username, formState.passwordResetCode, formState.password)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
            setFormType={setFormType}
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

async function confirmSignUp({ username, confirmationCode, password }) {
  try {
    await Auth.confirmSignUp(username, confirmationCode)
    console.log('confirm sign up success!')
    await signIn({ username, password });
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function signIn({ username, password }) {
  try {
    await Auth.signIn(username, password);
    console.log('sign in success!')
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function forgotPassword(username) {
  try {
    const data = await Auth.forgotPassword(username);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function forgotPasswordSubmit(username, code, newPassword) {
  debugger;
  try {
    const data = await Auth.forgotPasswordSubmit(username, code, newPassword)
    console.log(data);
    //await signIn({ username, password });
  } catch (error) { console.log(error) }

}
export default LoggedOut;