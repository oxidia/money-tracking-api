import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from "apollo-server";
import { Resolvers } from "../generated/backend";
import { signupSchema, signinSchema } from "../joi-schemes/user-schemes";
import { createAccountSchema } from "../joi-schemes/account-schemes";
import {
  addIncomeSchema,
  incomeSchema,
  incomesSchema
} from "../joi-schemes/income-schemes";
import { App } from "../types/app";
import UserDataSource from "../datasource/user-datasource";
import AccountDataSource from "app/datasource/account-datasource";
import IncomeDataSource from "app/datasource/income-datasource";
import { addExpenseSchema } from "../joi-schemes/expense-schemes";
import ExpenseDataSource from "app/datasource/expense-datasource";

type DataSource = {
  user: UserDataSource;
  account: AccountDataSource;
  income: IncomeDataSource;
  expense: ExpenseDataSource;
};

type UserContext = {
  dataSources: DataSource;
  isAuth: () => App.JWTPayload;
};

const resolvers: Resolvers = {
  Query: {
    version: function version() {
      return "1.0.0";
    },

    async me(_, __, { dataSources, isAuth }: UserContext) {
      const jwtPayload = isAuth();

      const user = await dataSources.user.findById(jwtPayload.userId);

      return user;
    },

    async account(_, { accountId }, { dataSources, isAuth }: UserContext) {
      const jwtPayload = isAuth();

      const account = await dataSources.account.findUserAccount(
        accountId,
        jwtPayload.userId
      );

      return account;
    },

    async accounts(_, __, { dataSources, isAuth }: UserContext) {
      const jwtPayload = isAuth();

      const accounts = await dataSources.account.findUserAccounts(
        jwtPayload.userId
      );

      return accounts;
    },

    async income(_, args, context: UserContext) {
      const { dataSources, isAuth } = context;
      const { userId } = isAuth();

      const { value, error } = incomeSchema.validate(args, {
        abortEarly: false
      });

      if (error) {
        throw new UserInputError(error.message, { details: error.details });
      }

      const account = await dataSources.account.findUserAccount(
        value.accountId,
        userId
      );

      if (!account) {
        return null;
      }

      const income = await dataSources.income.findAccountincome(
        value.incomeId,
        value.accountId
      );

      return income;
    },

    async incomes(_, args, context: UserContext) {
      const { dataSources, isAuth } = context;
      const { userId } = isAuth();

      const { error, value } = incomesSchema.validate(args);

      if (error) {
        throw new UserInputError(error.message, { details: error.details });
      }

      const account = await dataSources.account.findUserAccount(
        value.accountId,
        userId
      );

      if (!account) {
        return [];
      }

      const incomes = await dataSources.income.findAccountincomes(
        value.accountId
      );

      return incomes;
    }
  },
  Mutation: {
    async signin(_, { email, password }, { dataSources }: UserContext) {
      const { value, error } = signinSchema.validate(
        { email, password },
        { abortEarly: false }
      );

      if (error) {
        throw new UserInputError(error.message, { details: error.details });
      }

      const user = await dataSources.user.findByEmail(value.email);

      if (!user) {
        throw new AuthenticationError("invalid email and/or password");
      }

      const isIdenticalPass = await bcrypt.compare(
        value.password,
        user.password
      );

      if (!isIdenticalPass) {
        throw new AuthenticationError("invalid email and/or password");
      }

      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string
      );

      return { accessToken };
    },

    signup(_, { email, password }, { dataSources }: UserContext) {
      const { value, error } = signupSchema.validate(
        { email, password },
        { abortEarly: false }
      );

      if (error) {
        throw new UserInputError(error.message, { details: error.details });
      }

      const hashedPassword = bcrypt.hashSync(value.password, 10);

      return dataSources.user.create(value.email, hashedPassword);
    },

    createAccount(
      _,
      { bankName, accountNumber },
      { dataSources, isAuth }: UserContext
    ) {
      const jwtPayload = isAuth();
      const { value, error } = createAccountSchema.validate(
        {
          bankName,
          accountNumber
        },
        { abortEarly: false }
      );

      if (error) {
        throw new UserInputError(error.message, { details: error.details });
      }

      return dataSources.account.create(
        jwtPayload.userId,
        value.bankName,
        value.accountNumber
      );
    },

    async addIncome(_, args, context: UserContext) {
      const { dataSources, isAuth } = context;
      const { accountId, amount, source } = args;
      const { userId } = isAuth();

      const { value, error } = addIncomeSchema.validate(
        {
          accountId,
          amount,
          source
        },
        { abortEarly: false }
      );

      if (error) {
        throw new UserInputError(error.message, { details: error.details });
      }

      const account = await dataSources.account.findUserAccount(
        value.accountId,
        userId
      );

      if (!account) {
        throw new ForbiddenError(
          "account does not exists or your don't have permission"
        );
      }

      const income = await dataSources.income.create(accountId, amount, source);

      return income;
    },

    async addExpense(_, args, context: UserContext) {
      const { dataSources, isAuth } = context;
      const { accountId, amount, reason } = args;
      const { userId } = isAuth();

      const { value, error } = addExpenseSchema.validate(
        {
          accountId,
          amount,
          reason
        },
        { abortEarly: false }
      );

      if (error) {
        throw new UserInputError(error.message, { details: error.details });
      }

      const account = await dataSources.account.findUserAccount(
        value.accountId,
        userId
      );

      if (!account) {
        throw new ForbiddenError(
          "account does not exists or your don't have permission"
        );
      }

      const expense = await dataSources.expense.create(
        accountId,
        amount,
        reason
      );

      return expense;
    }
  }
};

export default resolvers;
