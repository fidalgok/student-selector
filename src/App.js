import React from 'react';
import useAmplifyAuth from './useAmplifyAuth';

import LoggedOut from './components/LoggedOut';
import LoggedIn from './components/LoggedIn';

function App() {
  const { state } = useAmplifyAuth();
  console.log(state);
  if (!state.isAuthAttempted) return null;
  if (!state.user) return <LoggedOut />
  return (
    <LoggedIn />
  );
}

export default App;
