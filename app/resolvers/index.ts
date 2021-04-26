import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server";
import { Resolvers } from "../generated/backend";
import UserDataSource from "../datasource/user-datasource";
import { signupSchema } from "../joi-schemes/user-schemes";

type DataSource = {
  user: UserDataSource;
};

type UserContext = {
  dataSources: DataSource;
};

const resolvers: Resolvers = {
  Query: {
    version: function version() {
      return "1.0.0";
    }
  },
  Mutation: {
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
