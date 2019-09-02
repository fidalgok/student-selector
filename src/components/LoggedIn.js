import React from 'react';
import Header from '../layout/Header';
import Dashboard from './Dashboard';

const LoggedIn = (props) => {
  return (<>
    <Header />
    <Dashboard />
  </>);
}

export default LoggedIn;