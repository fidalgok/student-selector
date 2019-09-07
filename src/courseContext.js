import React from 'react';

const CourseStateContext = React.createContext();
const CourseDispatchContext = React.createContext();

const courseActions = {
  LOAD_COURSES: 'LOAD_COURSES',
  DELETE_COURSE: 'DELETE_COURSE',
  CREATE_COURSE: 'CREATE_COURSE',
  UPDATE_COURSE: 'UPDATE_COURSE',
};

function courseReducer(state, action) {
  switch (action.type) {
    case courseActions.LOAD_COURSES: {
      return {
        courses: [...action.courses]
      }
    }
    case courseActions.DELETE_COURSE: {
      return {
        courses: state.courses.filter(c => c.id !== action.courseId)
      }
    }
    case courseActions.CREATE_COURSE: {
      return {
        courses: [action.course, ...state.courses]
      }
    }
    case courseActions.UPDATE_COURSE: {
      return {
        courses: state.courses.map(c => c.id === action.course.id ? { ...c, ...action.course } : c)
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