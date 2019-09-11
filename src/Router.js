import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditCourse from './components/EditCourse';
import CreateCourse from './components/CreateCourse';
import Session from './pages/Session';
import Dashboard from './components/Dashboard';

const AppRouter = (props) => {

  function getActiveSession(id, sessions) {

    const activeSession = sessions.find(sesh => sesh.id === id);
    return activeSession;
  }

  function getCourseById(id, courses) {
    return courses.find(c => c.id === id);
  }
  return (
    <Router>
      {props.children}
      <Switch>
        <Route exact path="/" render={(routerProps) => <Dashboard {...routerProps} {...props} />} />
        <Route exact path="/course/:id/edit" render={(routerProps) => <EditCourse {...routerProps} course={getCourseById(routerProps.match.params.id, props.courses)} />} />
        <Route exact path="/course/new" render={(routerProps) => <CreateCourse {...routerProps} />} />
        <Route exact path="/session/:id" render={(routerProps) => <Session {...routerProps} session={getActiveSession(routerProps.match.params.id, props.sessions)} viewOnly={routerProps.location.state && routerProps.location.state.viewOnly} />} />
      </Switch>
    </Router>
  )
}

export default AppRouter;