/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCourse = `query GetCourse($id: ID!) {
  getCourse(id: $id) {
    id
    name
    owner
    students {
      name
    }
    sessions {
      items {
        id
        status
        createdAt
        updatedAt
        completedAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const listCourses = `query ListCourses(
  $filter: ModelCourseFilterInput
  $limit: Int
  $nextToken: String
) {
  listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      owner
      students {
        name
      }
      sessions {
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getSession = `query GetSession($id: ID!) {
  getSession(id: $id) {
    id
    calledStudents {
      student {
        name
      }
      score
      calledDate
    }
    remainingStudents {
      name
    }
    course {
      id
      name
      owner
      students {
        name
      }
      sessions {
        nextToken
      }
      createdAt
      updatedAt
    }
    status
    createdAt
    updatedAt
    completedAt
  }
}
`;
export const listSessions = `query ListSessions(
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      calledStudents {
        score
        calledDate
      }
      remainingStudents {
        name
      }
      course {
        id
        name
        owner
        createdAt
        updatedAt
      }
      status
      createdAt
      updatedAt
      completedAt
    }
    nextToken
  }
}
`;
