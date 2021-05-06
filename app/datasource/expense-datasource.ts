import { PrismaClient } from "@prisma/client";
import PrismaDataSource from "./prisma-datasource";

export default class ExpenseDataSource extends PrismaDataSource {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  create(accountId: number, amount: number, reason: string): any {
    return this._prismaClient.expense.create({
      data: {
        accountId,
        amount,
        reason
      }
    });
  }
}
