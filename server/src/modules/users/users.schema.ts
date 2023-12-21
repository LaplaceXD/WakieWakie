import gql from "graphql-tag";

export const typeDefs = gql`
  "The possible gender options of the user."
  enum Gender {
    MALE
    FEMALE
    OTHERS
  }

  "The possible interests of a user for dating."
  enum Interest {
    MALE
    FEMALE
    EVERYONE
  }

  "The user schema."
  type User {
    "The user's ID in the database."
    id: ID!
    "The user's first name."
    firstName: String!
    "The user's last name."
    lastName: String!
    "The user's short descriptive bio."
    bio: String!
    "The user's gender."
    gender: Gender!
    "The user's interests."
    interest: Interest!
    "The user's city."
    city: String!
    "The user's country."
    country: String!
    "The user's waking time."
    alarmTime: Timetz!
    "The date the user was created."
    createdAt: Date!
    "The date the user was updated."
    updatedAt: Date
  }

  "The set of inputs required for registering a user."
  input RegisterInput {
    "The email of the user. This should be unique from user to user."
    email: String!
    "The username of the user. They will use this for logging in."
    username: String!
    "The desired password of the user."
    password: String!
    "The user's first name."
    firstName: String!
    "The user's last name."
    lastName: String!
    "A short bio descriptive of the user."
    bio: String
    "The user's gender."
    gender: Gender!
    "The dating interests of the user."
    interest: Interest!
    "The city where the user lives."
    city: String
    "The country where the user lives."
    country: String!
    "The time the user wakes up."
    alarmTime: Timetz!
  }

  "Response object containing a user object."
  type UserResponse implements Response {
    code: ResponseCode!
    success: Boolean!
    message: JSON!
    user: User
  }

  type Mutation {
    "Register a user."
    registerUser(userDetails: RegisterInput!): UserResponse!
    "Login a registereed user."
    loginUser(
      "The username (or email) of the user."
      username: String!
      "The password of the user."
      password: String!
    ): UserResponse!
  }

  type Query {
    "Get the currently logged in user."
    me: UserResponse!
  }
`;
