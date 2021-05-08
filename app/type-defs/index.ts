import { gql } from "apollo-server";

export default gql`
  scalar Date

  type User {
    id: Int!
    email: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Account {
    id: Int!
    bankName: String!
    accountNumber: String!
    balance: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type Income {
    id: Int!
    amount: Int!
    source: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Expense {
    id: Int!
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
    expense(expenseId: Int!, accountId: Int!): Expense
    expenses(accountId: Int!): [Expense!]!
  }
`;
