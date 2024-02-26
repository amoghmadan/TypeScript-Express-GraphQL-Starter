import { buildSchema } from 'graphql';

export default buildSchema(`
  type User {
    email: String!
    firstName: String!
    lastName: String!
    isAdmin: Boolean!
    dateJoined: String!
  }

  type Query {
    user: User!
    logout: String
  }
`);
