import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    email: String!
  }

  type Mutation {
    signup(email: String!, password: String!): User!
  }

  type Query {
    version: String!
  }
`;
