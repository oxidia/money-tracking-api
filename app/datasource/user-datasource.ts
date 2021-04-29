import { PrismaClient } from "@prisma/client";
import PrismaDataSource from "./prisma-datasource";

export default class UserDataSource extends PrismaDataSource {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  findById(id: number, select?: any): any {
    return this._prismaClient.user.findUnique({
      where: { id },
      select
    });
  }

  findByEmail(email: string, select?: any): any {
    return this._prismaClient.user.findUnique({
      where: {
        email
      },
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
