import React from 'react';
import { Auth } from 'aws-amplify'
import SignUpForm from './SignupForm';
import SignInForm from './SignInForm';
import ForgotPasswordForm, { UpdatePasswordForm } from './ForgotPasswordForm';


const LoggedOut = (props) => {

  const [formType, setFormType] = React.useState(window.localStorage.getItem('formType') || 'signIn');
  const [formError, setFormError] = React.useState(null);
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

  React.useEffect(() => {
    window.localStorage.setItem('formType', formType);
    setFormError(null);
  }, [formType])

  function renderForm() {
    switch (formType) {
      case 'signUp':
        return (
          <SignUpForm
            signUp={() => signUp(formState, setFormType, setFormError)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
            updateFormType={setFormType}
            formError={formError}
          />
        );
      case 'confirmSignUp':
        return (
          <SignUpForm
            formType={formType}
            username={formState.username}
            confirmSignUp={() => confirmSignUp(formState, setFormType, setFormError)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
            updateFormType={setFormType}
            formError={formError}
          />
        );
      case 'signIn':
        return (
          <SignInForm
            setFormType={setFormType}
            signIn={() => signIn(formState, setFormError)}
            updateFormState={e => updateFormState({
              type: 'updateFormState', e
            })}
            updateFormType={() => setFormType('signUp')}
            formError={formError}
          />
        )
      case 'forgotPassword':
        return (
          <ForgotPasswordForm
            formError={formError}
            setFormType={setFormType}
            forgotPassword={() => forgotPassword(formState.username, setFormType, setFormError)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      case 'forgotPasswordSubmit':
        return (
          <UpdatePasswordForm
            username={formState.username}
            submitNewPassword={() => forgotPasswordSubmit(formState.username, formState.passwordResetCode, formState.password, setFormError)}
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

async function signUp({ username, password, email }, setFormType, setFormError) {
  try {
    await Auth.signUp({
      username, password, attributes: { email }
    })

    setFormType('confirmSignUp')
  } catch (err) {
    console.log(err)
    if (err.code === 'InvalidParameterException') {
      setFormError(err.message)
    }
    if (err === 'Username cannot be empty') {
      setFormError(err)
    }

    if (err.code === 'UsernameExistsException') {
      setFormError('A user with that username was found. Click Sign in and try resetting your password.')
    }
  }
}

async function confirmSignUp({ username, confirmationCode, password }, _, setFormError) {
  try {
    await Auth.confirmSignUp(username, confirmationCode)

    await signIn({ username, password });
  } catch (err) {
    setFormError('Error Confirming Signup.')
  }
}

async function signIn({ username, password }, setFormError) {
  try {
    await Auth.signIn(username, password);
    setFormError(null);
  } catch (err) {
    if (err.code === 'UserNotFoundException') {

      setFormError('Username or password is incorrect, try again.')
    } else {
      setFormError('Hmm, something went wrong. Try again.')
    }
  }
}

async function forgotPassword(username, setFormType, setFormError) {
  try {
    const data = await Auth.forgotPassword(username);
    setFormType('forgotPasswordSubmit')
  } catch (error) {
    setFormError('No username found');
  }
}

async function forgotPasswordSubmit(username, code, newPassword) {

  try {
    const data = await Auth.forgotPasswordSubmit(username, code, newPassword)

  } catch (error) { console.log(error) }

}
export default LoggedOut;