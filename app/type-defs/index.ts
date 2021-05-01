import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    email: String!
  }

  type Account {
    id: Int!
    bankName: String!
    accountNumber: String!
    balance: Int!
  }

  type Token {
    accessToken: String!
  }

  type Mutation {
    signup(email: String!, password: String!): User!
    signin(email: String!, password: String!): Token!
    createAccount(bankName: String, accountNumber: String): Account!
  }

  type Query {
    version: String!
    me: User!
  }
`;
