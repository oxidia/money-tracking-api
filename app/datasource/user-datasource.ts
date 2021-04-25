import { PrismaClient } from "@prisma/client";
import PrismaDataSource from "./prisma-datasource";

export default class UserDataSource extends PrismaDataSource {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  findUserById(id: number, select?: any) {
    return this._prismaClient.user.findUnique({
      where: { id },
      select
    });
  }
}
