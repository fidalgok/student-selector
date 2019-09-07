import React from 'react';

const SessionStateContext = React.createContext();
const SessionDispatchContext = React.createContext();

const sessionActions = {
  LOAD_SESSIONS: 'LOAD_SESSIONS',
  DELETE_SESSION: 'DELETE_SESSION',
  CREATE_SESSION: 'CREATE_SESSION',
  UPDATE_SESSION: 'UPDATE_SESSION',
};

function sessionReducer(state, action) {
  switch (action.type) {
    case sessionActions.LOAD_SESSIONS: {
      return {
        sessions: [...action.sessions]
      }
    }
    case sessionActions.DELETE_SESSION: {
      return {
        sessions: state.sessions.filter(c => c.id !== action.sessionId)
      }
    }
    case sessionActions.CREATE_SESSION: {
      return {
        sessions: [action.session, ...state.sessions]
      }
    }
    case sessionActions.UPDATE_SESSION: {
      return {
        sessions: state.sessions.map(c => c.id === action.session.id ? { ...c, ...action.session } : c)
      }
    }


    default: return state;
  }
}

function SessionProvider({ children }) {
  const [state, dispatch] = React.useReducer(sessionReducer, { sessions: [] });
  return (
    <SessionStateContext.Provider value={state}>
      <SessionDispatchContext.Provider value={dispatch}>
        {children}
      </SessionDispatchContext.Provider>
    </SessionStateContext.Provider>
  )
}
function useSessionState() {
  const context = React.useContext(SessionStateContext);
  if (context === undefined) {
    throw new Error('useSessionState must be used within a SessionProvider');
  }
  return context;
}
function useSessionDispatch() {
  const context = React.useContext(SessionDispatchContext);
  if (context === undefined) {
    throw new Error('useSessionDispatch must be used within a SessionProvider');
  }
  return context;
}


export { SessionProvider, useSessionDispatch, useSessionState, sessionActions };