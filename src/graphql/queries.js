/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCourse = `query GetCourse($id: ID!) {
  getCourse(id: $id) {
    id
    name
    students {
      id
      name
      created_at
      updated_at
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
        id
        name
        created_at
        updated_at
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
    called_students {
      id
      student {
        id
        name
        created_at
        updated_at
      }
      rating
      created_at
      updated_at
    }
    students {
      id
      name
      created_at
      updated_at
    }
    course {
      id
      name
      students {
        id
        name
        created_at
        updated_at
      }
      created_at
      updated_at
    }
    active
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
      called_students {
        id
        rating
        created_at
        updated_at
      }
      students {
        id
        name
        created_at
        updated_at
      }
      course {
        id
        name
        created_at
        updated_at
      }
      active
      created_at
      updated_at
    }
    nextToken
  }
}
`;
export const getSessionScore = `query GetSessionScore($id: ID!) {
  getSessionScore(id: $id) {
    id
    student {
      id
      name
      created_at
      updated_at
    }
    rating
    created_at
    updated_at
  }
}
`;
export const listSessionScores = `query ListSessionScores(
  $filter: ModelSessionScoreFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessionScores(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      student {
        id
        name
        created_at
        updated_at
      }
      rating
      created_at
      updated_at
    }
    nextToken
  }
}
`;
export const getStudent = `query GetStudent($id: ID!) {
  getStudent(id: $id) {
    id
    name
    created_at
    updated_at
  }
}
`;
export const listStudents = `query ListStudents(
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      created_at
      updated_at
    }
    nextToken
  }
}
`;
