import { PrismaClient } from "@prisma/client";
import PrismaDataSource from "./prisma-datasource";

export default class AccountDataSource extends PrismaDataSource {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  create(userId: number, bankName: string, accountNumber: string): any {
    return this._prismaClient.account.create({
      data: {
        userId,
        bankName,
        accountNumber
      }
    });
  }
}
