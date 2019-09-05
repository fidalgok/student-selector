import { API, graphqlOperation } from 'aws-amplify';
import { courseActions } from './courseContext';

// random num generator

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
    return { error: null, courses: data.listCourses.items }
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

export const createSession = async (courseId, studentList) => {
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

    return { error: null, session: data.createSession }
  } catch (error) { return { error } }
}

export const updateSession = async () => {
  // update session details, generic for updating session details
  // can be passed required param id
  // can be passed optional params, calledStudents, remainingStudents, status
}