import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Course from './pages/Course';
import Session from './pages/Session';
import Dashboard from './components/Dashboard';

const AppRouter = (props) => {
  return (
    <Router>
      {props.children}
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/course/:id/edit" render={(props) => <Course {...props} isEditing />} />
        <Route exact path="/course/:id/new" render={(props) => <Course {...props} />} />
        <Route exact path="/course/:courseId/session/:SessionId" render={(props) => <Session {...props} />} />
      </Switch>
    </Router>
  )
}

export default AppRouter;