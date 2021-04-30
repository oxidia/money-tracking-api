import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";
import { Resolvers } from "../generated/backend";
import UserDataSource from "../datasource/user-datasource";
import { signupSchema, signinSchema } from "../joi-schemes/user-schemes";
import { App } from "../types/app";

type DataSource = {
  user: UserDataSource;
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
    }
  }
};

export default resolvers;
