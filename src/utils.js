import { API, graphqlOperation } from 'aws-amplify';
import { courseActions } from './courseContext';

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
            items{
              id
              status
              createdAt
              calledStudents{
                student{
                  name
                }
                score
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

export const createSession = async (courseDispatch = () => { }, courseId = '', studentList = []) => {
  // defaults for getting a session up and running
  //CreateSessionInput
  //   id: ID
  // calledStudents: [SessionScoreInput]!
  // remainingStudents: [StudentInput]!
  // status: SessionStatus! default NEW
  // created_at: String
  // updated_at: String
  // sessionCourseId: ID!
  const createSessionMutation = `
mutation createSession($input: CreateSessionInput!) {
  createSession(input: $input){
    id
    status
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
    courseDispatch({
      type: courseActions.UPDATE_SESSION, course: {
        id: courseId,
      },
      session: data.createSession
    })
    return { error: null }
  } catch (error) { return { error } }
}

export const updateSession = async (courseDispatch = () => { }, updatedSession = {}, sessionStatus = 'IN_PROGRESS') => {
  // update session details, generic for updating session details
  // will be passed required param id
  // can be passed optional params, calledStudents, remainingStudents, status

  const updateSessionMutation = `
    mutation updateSession($input: UpdateSessionInput!) {
      updateSession(input: $input){
        id
        status
        course{
          id
        }
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
        id: updatedSession.id,
        calledStudents: updatedSession.calledStudents,
        remainingStudents: updatedSession.remainingStudents,
        status: sessionStatus
      }
    }));
    debugger;
    // sort called students by called Date
    data.updateSession.calledStudents.sort((a, b) => {
      // sorts so latest date is last in array
      if (a.calledDate < b.calledDate) return -1;
      if (a.calledDate > b.calledDate) return 1;
      return 0;
    });

    courseDispatch({
      type: courseActions.UPDATE_SESSION, course: {
        id: data.updateSession.course.id
      },
      session: data.updateSession
    });
    return { error: null }
  } catch (error) { return { error } }

}