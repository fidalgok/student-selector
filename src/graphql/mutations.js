/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCourse = `mutation CreateCourse($input: CreateCourseInput!) {
  createCourse(input: $input) {
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
export const updateCourse = `mutation UpdateCourse($input: UpdateCourseInput!) {
  updateCourse(input: $input) {
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
export const deleteCourse = `mutation DeleteCourse($input: DeleteCourseInput!) {
  deleteCourse(input: $input) {
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
export const createSession = `mutation CreateSession($input: CreateSessionInput!) {
  createSession(input: $input) {
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
export const updateSession = `mutation UpdateSession($input: UpdateSessionInput!) {
  updateSession(input: $input) {
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
export const deleteSession = `mutation DeleteSession($input: DeleteSessionInput!) {
  deleteSession(input: $input) {
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
