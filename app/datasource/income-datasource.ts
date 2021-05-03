import { PrismaClient } from "@prisma/client";
import PrismaDataSource from "./prisma-datasource";

export default class IncomeDataSource extends PrismaDataSource {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  findAccountincome(incomeId: number, accountId: number): any {
    return this._prismaClient.income.findFirst({
      where: {
        id: incomeId,
        accountId: accountId
      }
    });
  }

  findAccountincomes(accountId: number): any {
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
