import { API, graphqlOperation } from 'aws-amplify';
import { courseActions } from './courseContext';
import { sessionActions } from './sessionContext';

// random num generator
export function getRandomArrayIdx(max) {
  return Math.floor((Math.random() * max));
}

// format dates
export function formatDate(date = new Date(), delimeter = '/') {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}${delimeter}${month}${delimeter}${year}`
}

// Add api functionality here
// Get the courses new session
// query courseNewSession {
//   listCourses(filter: {id: {eq: "c4d14136-3e81-49d1-a885-da32bdb18787"}}) {
//     items {
//       sessions(filter: {status: {eq: NEW}}) {
//         items {
//           remainingStudents {
//             name
//           }
//         }
//       }
//     }
//   }
// }

// mutation createSession {
//   createSession(input: {
//     sessionCourseId: "c4d14136-3e81-49d1-a885-da32bdb18787",
//     calledStudents: [],
//     status: NEW,
//     remainingStudents: [{name: "Baldwin Eagle"}, {name:"Kyle Cardinal"}, {name: "Sammy Seahawk"}, {name: "Kristin Sandpiper"}]
//   }){
//     id
//     status
//     remainingStudents{
//       name
//     }
//   }
// }

export const listCourses = async () => {
  const listCourses = `
    query {
      listCourses{
        items {
          id
          name
          students{
            name
          }
          sessions{
            nextToken
            items{
              id
              status
              createdAt
              calledStudents{
                student{
                  name
                }
                score
                calledDate
              }
              remainingStudents{
                name
              }
            }
          }
        }
      }
    }
  `;
  try {
    const { data } = await API.graphql(graphqlOperation(listCourses));
    // while (data.listCourses.sessions.nextToken){
    //   const nextSessions = await API.graphql(graphqlOperation())
    // }
    const courses = data.listCourses.items.map(course => ({
      ...course,
      sessions: course.sessions.items.map(session => ({ ...session })),
    }))
    return { error: null, courses }
  } catch (error) { return { error } }
}

export async function createCourse(courseName) {
  // set up a new course with defaults
  const addCourseMutation = `
  mutation createCourse ($input: CreateCourseInput!){
    createCourse(input: $input) {
      id
      name
      students{
        name
      }
      sessions{
        items{
          id
        }
      }
    }
  }
  `;
  // create a new course with an empty student list as the default
  try {
    const { data } = await API.graphql(graphqlOperation(addCourseMutation, {
      input: {
        name: courseName,
        students: [],
      }
    }));
    const course = {
      ...data.createCourse,
      sessions: data.createCourse.sessions.items.map(session => ({ ...session }))
    }
    return { error: null, course }
  } catch (error) {
    return { error }
  }
}

export const updateCourseStudents = async (courseId, studentList) => {
  // use the update course mutation to add students
  // maybe refactor the api later to use student ids?
  const updateCourseMutation = `
  mutation updateCourseStudents($input: UpdateCourseInput!){

    updateCourse(input: $input){
      students{
        name
      }
    }
  }
  `
  try {
    const { data } = await API.graphql(graphqlOperation(updateCourseMutation, {
      input: {
        id: courseId,
        students: studentList
      }
    }
    ));
    // send back the updated student list on success
    return { error: null, students: data.updateCourse.students }
  } catch (error) { return { error } }
}

export const deleteCourseStudent = async (courseDispatch, courseId, students) => {
  const deleteCourseStudentMutation = `
  mutation deleteCourseStudents($input: UpdateCourseInput!){

    updateCourse(input: $input){
      students{
        name
      }
    }
  }
  `
  try {
    const { data } = await API.graphql(graphqlOperation(deleteCourseStudentMutation, {
      input: {
        id: courseId,
        students: students
      }
    }));
    // update the courseContext
    courseDispatch({ type: courseActions.UPDATE_COURSE, course: { id: courseId, students: data.updateCourse.students } });
  } catch (err) { return { error: err } }
}

export const updateCourse = async (courseDispatch, id, updatedCourse) => {
  // use the update course mutation to add students
  // maybe refactor the api later to use student ids?
  const updateCourseMutation = `
  mutation updateCourse($input: UpdateCourseInput!){

    updateCourse(input: $input){
      id
      name
      students{
        name
      }
    }
  }
  `
  try {
    if (!id) {
      throw new Error('A course Id is required to update a course');
    }
    const { data } = await API.graphql(graphqlOperation(updateCourseMutation, {
      input: { ...updatedCourse, id }
    }));
    // update the courses context
    courseDispatch({ type: courseActions.UPDATE_COURSE, course: data.updateCourse });
    // send back the updated student list on success

    return { error: null, course: data.updateCourse }
  } catch (error) { return { error } }
}

export const deleteCourse = async (courseId) => {
  const deleteCourseMutation = `
    mutation deleteCourse($id: ID){
      deleteCourse(input: {id: $id}){
        id
      }
    }
  `;
  try {
    await API.graphql(graphqlOperation(deleteCourseMutation, { id: courseId }));
  } catch (error) { return { error } }
}


export const listSessions = async (sessionDispatch) => {
  const LIST_SESSIONS_QUERY = `
    query listSessions($nextToken: String){
      listSessions(nextToken: $nextToken){
        nextToken
            items{
              id
              status
              createdAt
              course{
                id
                name
              }
              calledStudents{
                student{
                  name
                }
                score
                calledDate
              }
              remainingStudents{
                name
              }
            }
      }
    }
  `;
  let allSessions = [];
  try {
    const { data } = await API.graphql(graphqlOperation(LIST_SESSIONS_QUERY));
    allSessions = [...data.listSessions.items];
    if (data.listSessions.nextToken) {
      while (data.listSessions.nextToken) {
        const { data } = await API.graphql(graphqlOperation(LIST_SESSIONS_QUERY), { nextToken: data.listSessions.nextToken });
        allSessions = [...allSessions, ...data.listSessions.items]
      }
    }
    sessionDispatch({ type: sessionActions.LOAD_SESSIONS, sessions: allSessions });
    return { error: null }
  } catch (error) { return { error } }
}

export const createSession = async (sessionDispatch = () => { }, courseId = '', studentList = []) => {

  const createSessionMutation = `
mutation createSession($input: CreateSessionInput!) {
  createSession(input: $input){
    id
    status
    course{
      id
      name
    }
    remainingStudents{
      name
    }
    calledStudents{
      score
    }
  }
}`
  try {
    const { data } = await API.graphql(graphqlOperation(createSessionMutation, {
      input: {
        sessionCourseId: courseId,
        calledStudents: [],
        remainingStudents: studentList,
        status: 'NEW'
      }
    }));
    sessionDispatch({
      type: sessionActions.CREATE_SESSION,
      session: data.createSession
    })
    return { error: null, session: data.createSession }
  } catch (error) { return { error } }
}

export const updateSession = async (sessionDispatch = () => { }, updatedSession = {}, sessionStatus = 'IN_PROGRESS') => {
  // update session details, generic for updating session details
  // will be passed required param id
  // can be passed optional params, calledStudents, remainingStudents, status

  const updateSessionMutation = `
    mutation updateSession($input: UpdateSessionInput!) {
      updateSession(input: $input){
        id
        status
        course{id}
        calledStudents{
          student{name}
          score
          calledDate
        }
        remainingStudents{
          name
        }
      }
    }`

  try {
    const { data } = await API.graphql(graphqlOperation(updateSessionMutation, {
      input: {
        ...updatedSession,
        status: sessionStatus
      }
    }));

    // sort called students by called Date
    data.updateSession.calledStudents.sort((a, b) => {
      // sorts so latest date is first in array
      if (a.calledDate > b.calledDate) return -1;
      if (a.calledDate < b.calledDate) return 1;
      return 0;
    });

    sessionDispatch({
      type: sessionActions.UPDATE_SESSION,
      session: data.updateSession
    });
    return { error: null }
  } catch (error) { return { error } }

}