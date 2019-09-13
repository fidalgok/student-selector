/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCourse = `mutation CreateCourse($input: CreateCourseInput!) {
  createCourse(input: $input) {
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
export const updateCourse = `mutation UpdateCourse($input: UpdateCourseInput!) {
  updateCourse(input: $input) {
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
export const deleteCourse = `mutation DeleteCourse($input: DeleteCourseInput!) {
  deleteCourse(input: $input) {
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
export const createSession = `mutation CreateSession($input: CreateSessionInput!) {
  createSession(input: $input) {
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
export const updateSession = `mutation UpdateSession($input: UpdateSessionInput!) {
  updateSession(input: $input) {
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
export const deleteSession = `mutation DeleteSession($input: DeleteSessionInput!) {
  deleteSession(input: $input) {
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
