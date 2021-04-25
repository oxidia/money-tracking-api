import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import typeDefs from "./type-defs";
import resolvers from "./resolvers";
import UserDataSource from "./datasource/user-datasource";

config();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  dataSources: () => {
    const prisma = new PrismaClient();

    return {
      user: new UserDataSource(prisma)
    };
  }
});

export default server;
