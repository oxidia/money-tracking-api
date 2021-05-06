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

  type Income {
    id: Int!
    amount: Int!
    source: String!
  }

  type Expense {
    id: Int!
    amount: Int!
    reason: String!
  }

  type Token {
    accessToken: String!
  }

  type Mutation {
    signup(email: String!, password: String!): User!
    signin(email: String!, password: String!): Token!
    createAccount(bankName: String, accountNumber: String): Account!
    addIncome(accountId: Int!, amount: Int!, source: String!): Income!
    addExpense(accountId: Int!, amount: Int!, reason: String!): Expense!
  }

  type Query {
    version: String!
    me: User!
    account(accountId: Int!): Account
    accounts: [Account]
    income(incomeId: Int!, accountId: Int!): Income
    incomes(accountId: Int!): [Income!]!
  }
`;
