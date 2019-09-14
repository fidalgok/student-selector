import React from 'react';
import { Auth } from 'aws-amplify';
import styled from '@emotion/styled';
import SignUpForm from './SignupForm';
import SignInForm from './SignInForm';
import ForgotPasswordForm, { UpdatePasswordForm } from './ForgotPasswordForm';
import { AppLogo } from './styled/Icons';

const LoggedOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;
const LoggedOutWrapper = styled.div`
  border-radius: 15px;
  box-shadow: 2px 4px 8px rgba(10,10,0, .2),
              0px 2px 2px rgba(10,10,0, .2);
`;

const AppTitle = styled.h1`
  font-size: 4.8rem;
  margin: 0;
  display: inline-block;

  @media (max-width: 430px){
    font-size: 3.2rem;
  }
`;

const Logo = styled(AppLogo)`
  width: 6rem;
  display: inline-block;
  margin-right: 2.4rem;
  @media (max-width: 430px){
    flex-basis: 20%;
  }
`;

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
      case 'resetForm':
        return {
          username: '',
          password: '',
          confirmationCode: '',
          email: '',
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
    let isCurrent = true;
    if (isCurrent) {

      window.localStorage.setItem('formType', formType);
      setFormError(null);
    }
    return () => {
      isCurrent = false;
      window.localStorage.setItem('formType', 'signIn');

    }
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
            resetForm={() => updateFormState({ type: 'resetForm' })}
            formError={formError}
          />
        );
      case 'signIn':
        return (
          <SignInForm
            setFormType={setFormType}
            signIn={() => signIn(formState, setFormError, updateFormState, setFormType)}
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
            updateFormType={setFormType}
            resetForm={() => updateFormState({ type: 'resetForm' })}
          />
        )
      case 'forgotPasswordSubmit':
        return (
          <UpdatePasswordForm
            formError={formError}
            username={formState.username}
            submitNewPassword={() => forgotPasswordSubmit(formState.username, formState.passwordResetCode, formState.password, setFormError, setFormType)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
            updateFormType={setFormType}
            resetForm={() => updateFormState({ type: 'resetForm' })}
          />
        )
      default:
        return null;
    }
  }
  return (<LoggedOutContainer>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.4rem' }}>

      <Logo /><AppTitle>Student Selector</AppTitle>
    </div>
    <LoggedOutWrapper>

      {renderForm()}
    </LoggedOutWrapper>
  </LoggedOutContainer>);
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

async function signIn({ username, password }, setFormError, updateFormState, setFormType) {
  try {
    await Auth.signIn(username, password);
    updateFormState({ type: 'resetForm' });
    setFormType('signIn')
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

async function forgotPasswordSubmit(username, code, newPassword, setFormError, setFormType) {

  try {
    const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
    setFormType('signIn')
  } catch (error) {
    console.log(error)
    if (error === 'Password cannot be empty') {

      return setFormError(error)
    }
    if (error.code === 'CodeMismatchException') {
      return setFormError(error.message)
    }
    if (error === 'Code cannot be empty') {
      return setFormError(error)
    }
    if (error === 'Username cannot be empty') {
      return setFormError(error)
    }
    if (error.code === 'InvalidParameterException') {
      return setFormError('Password must be at least 6 characters')
    }
    if (error.code === 'UserNotFoundException') {
      return setFormError('Username does not exist, try signing up')
    }
    return setFormError('Something went wrong, please try again later')
  }

}
export default LoggedOut;