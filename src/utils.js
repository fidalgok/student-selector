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
  return `${month}${delimeter}${day}${delimeter}${year}`
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

export const listCourses = async (limit = 20) => {
  const listCourses = `
    query listCourses($limit: Int){
      listCourses(limit: $limit){
        items {
          id
          name
          students{
            name
          }

        }
      }
    }
  `;
  try {
    const { data } = await API.graphql(graphqlOperation(listCourses, { limit }));
    // while (data.listCourses.sessions.nextToken){
    //   const nextSessions = await API.graphql(graphqlOperation())
    // }
    const courses = data.listCourses.items;
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

    return { error: null, course: data.createCourse }
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


export const listSessions = async (sessionDispatch, limit = 30) => {
  const LIST_SESSIONS_QUERY = `
    query listSessions($nextToken: String, $limit: Int){
      listSessions(nextToken: $nextToken, limit: $limit){
        nextToken
            items{
              id
              status
              createdAt
              completedAt
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
    const { data } = await API.graphql(graphqlOperation(LIST_SESSIONS_QUERY, { limit }));
    allSessions = [...data.listSessions.items];
    let nextToken = data.listSessions.nextToken;

    if (nextToken) {
      while (nextToken) {
        const res = await API.graphql(graphqlOperation(LIST_SESSIONS_QUERY, { nextToken: nextToken, limit }));
        allSessions = [...allSessions, ...res.data.listSessions.items];
        nextToken = res.data.listSessions.nextToken;
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
  } catch (error) { return { error, session: {} } }
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
        completedAt
        course{id name}
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