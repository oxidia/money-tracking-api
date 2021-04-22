import { Resolvers } from "../generated/backend";

const resolvers: Resolvers = {
  Query: {
    version: function version() {
      return "1.0.0";
    }
  }
};

export default resolvers;
