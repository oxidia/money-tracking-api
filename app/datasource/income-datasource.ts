import { PrismaClient } from "@prisma/client";
import PrismaDataSource from "./prisma-datasource";

export default class IncomeDataSource extends PrismaDataSource {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  create(accountId: number, amount: number, source: string): any {
    return this._prismaClient.income.create({
      data: {
        accountId,
        amount,
        source
      }
    });
  }
}
