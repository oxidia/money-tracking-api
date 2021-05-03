import { PrismaClient } from "@prisma/client";
import PrismaDataSource from "./prisma-datasource";

export default class IncomeDataSource extends PrismaDataSource {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  findAccountIcome(incomeId: number, accountId: number): any {
    return this._prismaClient.income.findFirst({
      where: {
        id: incomeId,
        accountId: accountId
      }
    });
  }

  findAccountIcomes(accountId: number): any {
    return this._prismaClient.income.findMany({
      where: {
        accountId
      }
    });
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
