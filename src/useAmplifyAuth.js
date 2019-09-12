import React from 'react';
import { Auth, Hub } from 'aws-amplify';

export const amplifyActionTypes = {
  FETCH_USER_DATA_INIT: 'FETCH_USER_DATA_INIT',
  FETCH_USER_DATA_SUCCESS: 'FETCH_USER_DATA_SUCCESS',
  FETCH_USER_DATA_FAILURE: 'FETCH_USER_DATA_FAILURE',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  RESET_USER_DATA: 'RESET_USER_DATA',
}

const amplifyReducer = (state, action) => {
  switch (action.type) {
    case amplifyActionTypes.FETCH_USER_DATA_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isAuthAttempted: true,
      };
    case amplifyActionTypes.FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        signInError: null,
        user: action.payload.user
      }
    case amplifyActionTypes.FETCH_USER_DATA_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case amplifyActionTypes.RESET_USER_DATA:
      return { ...state, user: null };
    case amplifyActionTypes.SIGN_IN_FAILURE:
      return { ...state, signInError: action.payload }
    default:
      throw new Error('Invalid action type for amplify reducer');
  }
}

const useAmplifyAuth = () => {
  const initialState = {
    isLoading: true,
    isAuthAttempted: false,
    isError: false,
    user: null,
    signInError: null,
  }
  const [state, dispatch] = React.useReducer(amplifyReducer, initialState);
  const [triggerFetch, setTriggerFetch] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      if (isMounted) dispatch({ type: amplifyActionTypes.FETCH_USER_DATA_INIT });

      try {
        if (isMounted) {
          const data = await Auth.currentAuthenticatedUser();
          if (data) {
            dispatch({
              type: amplifyActionTypes.FETCH_USER_DATA_SUCCESS,
              payload: { user: data }
            });
          }
        }
      } catch (error) {

        if (isMounted) dispatch({ type: amplifyActionTypes.FETCH_USER_DATA_FAILURE });
      }
    }

    const HubListener = () => {
      Hub.listen('auth', (data) => {
        const { payload } = data;

        switch (payload.event) {
          case 'signIn':
            setTriggerFetch(true);
            break;
          case 'signUp':
            // maybe do something with signUp like auto login?
            break;
          case 'signOut':
            dispatch({
              type: amplifyActionTypes.RESET_USER_DATA
            });
            setTriggerFetch(false);
            break;
          case 'signIn_failure':
            dispatch({
              type: amplifyActionTypes.SIGN_IN_FAILURE,
              payload: payload
            })
            break;
          default:
            break;
        }


      })
    }

    HubListener();
    fetchUserData();

    // clean up the listener when component dismounts
    return () => {
      Hub.remove('auth');
      isMounted = false;
    }

  }, [triggerFetch]);

  return { state }
}

export default useAmplifyAuth;