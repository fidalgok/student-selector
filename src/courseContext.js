import React from 'react';

const CourseStateContext = React.createContext();
const CourseDispatchContext = React.createContext();

const courseActions = {
  LOAD_COURSES: 'LOAD_COURSES',
};

function courseReducer(state, action) {
  switch (action.type) {
    case courseActions.LOAD_COURSES: {
      return {
        courses: [...action.courses]
      }
    }
    default: return state;
  }
}

function CourseProvider({ children }) {
  const [state, dispatch] = React.useReducer(courseReducer, { courses: [] });
  return (
    <CourseStateContext.Provider value={state}>
      <CourseDispatchContext.Provider value={dispatch}>
        {children}
      </CourseDispatchContext.Provider>
    </CourseStateContext.Provider>
  )
}
function useCourseState() {
  const context = React.useContext(CourseStateContext);
  if (context === undefined) {
    throw new Error('useCourseState must be used within a CourseProvider');
  }
  return context;
}
function useCourseDispatch() {
  const context = React.useContext(CourseDispatchContext);
  if (context === undefined) {
    throw new Error('useCourseDispatch must be used within a CourseProvider');
  }
  return context;
}

export { CourseProvider, useCourseDispatch, useCourseState, courseActions };