import { gql } from "apollo-server";

export default gql`
  scalar Date

  type User {
    id: ID!
    email: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Account {
    id: ID!
    bankName: String!
    accountNumber: String!
    balance: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type Income {
    id: ID!
    amount: Int!
    source: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Expense {
    id: ID!
    amount: Int!
    reason: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Token {
    accessToken: String!
  }

  type Mutation {
    signup(email: String!, password: String!): User!
    signin(email: String!, password: String!): Token!
    createAccount(bankName: String!, accountNumber: String!): Account!
    addIncome(accountId: ID!, amount: Int!, source: String!): Income!
    addExpense(accountId: ID!, amount: Int!, reason: String!): Expense!
  }

  type Query {
    version: String!
    me: User!
    account(accountId: ID!): Account
    accounts: [Account]
    income(incomeId: ID!, accountId: ID!): Income
    incomes(accountId: ID!): [Income!]!
    expense(expenseId: ID!, accountId: ID!): Expense
    expenses(accountId: ID!): [Expense!]!
  }
`;
