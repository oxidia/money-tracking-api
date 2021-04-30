import { ApolloServer, AuthenticationError } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import typeDefs from "./type-defs";
import resolvers from "./resolvers";
import UserDataSource from "./datasource/user-datasource";
import { App } from "./types/app";

config();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,

  context({ req }) {
    const authHeader = req.header("authorization");

    return {
      isAuth(): App.JWTPayload {
        if (!authHeader) {
          throw new AuthenticationError("unauthorized");
        }

        const [label, token] = authHeader.split(" ");

        if (label != "Bearer") {
          throw new AuthenticationError("unauthorized");
        }

        const jwtPayload = jwt.verify(
          token,
          process.env.JWT_SECRET_KEY as string
        ) as App.JWTPayload;

        return jwtPayload;
      }
    };
  },

  dataSources() {
    const prisma = new PrismaClient();

    return {
      user: new UserDataSource(prisma)
    };
  }
});

export default server;
