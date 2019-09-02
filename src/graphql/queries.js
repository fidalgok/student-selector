/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCourse = `query GetCourse($id: ID!) {
  getCourse(id: $id) {
    id
    name
    students {
      name
    }
    sessions {
      items {
        id
        status
        created_at
        updated_at
      }
      nextToken
    }
    created_at
    updated_at
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
      students {
        name
      }
      sessions {
        nextToken
      }
      created_at
      updated_at
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
    }
    remainingStudents {
      name
    }
    course {
      id
      name
      students {
        name
      }
      sessions {
        nextToken
      }
      created_at
      updated_at
    }
    status
    created_at
    updated_at
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
      }
      remainingStudents {
        name
      }
      course {
        id
        name
        created_at
        updated_at
      }
      status
      created_at
      updated_at
    }
    nextToken
  }
}
`;
