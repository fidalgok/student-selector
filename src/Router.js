import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import EditCourse from './components/EditCourse';
import CreateCourse from './components/CreateCourse';
import SessionReport from './components/SessionReport';
import Session from './pages/Session';
import Dashboard from './components/Dashboard';

const AppRouter = (props) => {

  function getActiveSession(id, sessions = []) {

    const activeSession = sessions.find(sesh => sesh.id === id);
    return activeSession;
  }

  function getCourseById(id, courses = []) {
    return courses.find(c => c.id === id);
  }

  return (
    <Router>
      {props.children}
      <Switch>
        <Route exact path="/" render={(routerProps) => <Dashboard {...routerProps} {...props} />} />
        <Route exact path="/course/:id/edit" render={(routerProps) => {
          const foundCourse = getCourseById(routerProps.match.params.id, props.courses);
          if (!foundCourse) return <Redirect to="/" />
          return <EditCourse {...routerProps} course={foundCourse} />
        }} />
        <Route exact path="/course/new" render={(routerProps) => <CreateCourse {...routerProps} />} />
        <Route exact path="/session/:id" render={(routerProps) => {
          const sesh = getActiveSession(routerProps.match.params.id, props.sessions);
          if (!sesh) return <Redirect to="/" />
          return <Session {...routerProps} session={sesh} viewOnly={routerProps.location.state && routerProps.location.state.viewOnly} />
        }} />
        <Route exact path="/course/:id/report" render={(routerProps) => {
          if (!routerProps.location.state) return <Redirect to="/" />
          return <SessionReport {...routerProps} course={routerProps.location.state.course} />
        }} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  )
}

export default AppRouter;