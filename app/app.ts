import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import typeDefs from "./type-defs";
import resolvers from "./resolvers";

config();

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

export default server;
