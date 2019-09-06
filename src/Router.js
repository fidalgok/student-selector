import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditCourse from './components/EditCourse';
import CreateCourse from './components/CreateCourse';
import Session from './pages/Session';
import Dashboard from './components/Dashboard';

const AppRouter = (props) => {

  function getActiveSession(courseId, courses) {

    const foundCourse = getCourseById(courseId, courses);
    const activeSession = foundCourse.sessions.find(sesh => sesh.status === 'NEW' || 'IN_PROGRESS');
    return activeSession;
  }
  function getCourseById(courseId, courses) {
    const foundCourse = courses.find(c => c.id === courseId);
    return foundCourse;
  }
  return (
    <Router>
      {props.children}
      <Switch>
        <Route exact path="/" render={(routerProps) => <Dashboard {...routerProps} courses={props.courses} />} />
        <Route exact path="/course/:id/edit" render={(routerProps) => <EditCourse {...routerProps} course={getCourseById(routerProps.match.params.id, props.courses)} />} />
        <Route exact path="/course/new" render={(routerProps) => <CreateCourse {...routerProps} />} />
        <Route exact path="/course/:courseId/session/" render={(routerProps) => <Session {...routerProps} session={getActiveSession(routerProps.match.params.courseId, props.courses)} />} />
      </Switch>
    </Router>
  )
}

export default AppRouter;