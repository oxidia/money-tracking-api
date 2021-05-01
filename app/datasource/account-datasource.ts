import { PrismaClient } from "@prisma/client";
import PrismaDataSource from "./prisma-datasource";

export default class AccountDataSource extends PrismaDataSource {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  findUserAccount(accountId: number, userId: number): any {
    return this._prismaClient.account.findFirst({
      where: {
        id: accountId,
        userId
      }
    });
  }

  findUserAccounts(userId: number): any {
    return this._prismaClient.account.findMany({
      where: {
        userId
      }
    });
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
