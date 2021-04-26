import { PrismaClient } from "@prisma/client";
import PrismaDataSource from "./prisma-datasource";

export default class UserDataSource extends PrismaDataSource {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  findById(id: number, select?: any) {
    return this._prismaClient.user.findUnique({
      where: { id },
      select
    });
  }

  create(email: string, password: string) {
    return this._prismaClient.user.create({
      data: {
        email,
        password
      }
    });
  }
}
