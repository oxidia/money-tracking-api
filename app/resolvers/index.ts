import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";
import { Resolvers } from "../generated/backend";
import UserDataSource from "../datasource/user-datasource";
import { signupSchema, signinSchema } from "../joi-schemes/user-schemes";
import { createAccountSchema } from "../joi-schemes/account-schemes";
import { App } from "../types/app";
import AccountDataSource from "app/datasource/account-datasource";

type DataSource = {
  user: UserDataSource;
  account: AccountDataSource;
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
    }
  }
};

export default resolvers;
