/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCourse = `mutation CreateCourse($input: CreateCourseInput!) {
  createCourse(input: $input) {
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
export const updateCourse = `mutation UpdateCourse($input: UpdateCourseInput!) {
  updateCourse(input: $input) {
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
export const deleteCourse = `mutation DeleteCourse($input: DeleteCourseInput!) {
  deleteCourse(input: $input) {
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
export const createSession = `mutation CreateSession($input: CreateSessionInput!) {
  createSession(input: $input) {
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
export const updateSession = `mutation UpdateSession($input: UpdateSessionInput!) {
  updateSession(input: $input) {
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
export const deleteSession = `mutation DeleteSession($input: DeleteSessionInput!) {
  deleteSession(input: $input) {
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
export const createSessionScore = `mutation CreateSessionScore($input: CreateSessionScoreInput!) {
  createSessionScore(input: $input) {
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
export const updateSessionScore = `mutation UpdateSessionScore($input: UpdateSessionScoreInput!) {
  updateSessionScore(input: $input) {
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
export const deleteSessionScore = `mutation DeleteSessionScore($input: DeleteSessionScoreInput!) {
  deleteSessionScore(input: $input) {
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
export const createStudent = `mutation CreateStudent($input: CreateStudentInput!) {
  createStudent(input: $input) {
    id
    name
    created_at
    updated_at
  }
}
`;
export const updateStudent = `mutation UpdateStudent($input: UpdateStudentInput!) {
  updateStudent(input: $input) {
    id
    name
    created_at
    updated_at
  }
}
`;
export const deleteStudent = `mutation DeleteStudent($input: DeleteStudentInput!) {
  deleteStudent(input: $input) {
    id
    name
    created_at
    updated_at
  }
}
`;
