import { ApolloServer, AuthenticationError } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import typeDefs from "./type-defs";
import resolvers from "./resolvers";
import UserDataSource from "./datasource/user-datasource";
import AccountDataSource from "./datasource/account-datasource";
import IncomeDataSource from "./datasource/income-datasource";
import ExpenseDataSource from "./datasource/expense-datasource";
import { ScalarDate } from "./scalar-types";
import { App } from "./types/app";

config();

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: [ScalarDate, resolvers],

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
    return {
      user: new UserDataSource(prisma),
      account: new AccountDataSource(prisma),
      income: new IncomeDataSource(prisma),
      expense: new ExpenseDataSource(prisma)
    };
  }
});

export default server;
