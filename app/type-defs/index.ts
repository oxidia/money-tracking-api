import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    email: String!
  }

  type Token {
    accessToken: String!
  }

  type Mutation {
    signup(email: String!, password: String!): User!
    signin(email: String!, password: String!): Token!
  }

  type Query {
    version: String!
    me: User!
  }
`;
