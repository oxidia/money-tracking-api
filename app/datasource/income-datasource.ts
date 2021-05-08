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

  async create(
    accountId: number,
    amount: number,
    source: string
  ): Promise<any> {
    const [_, income] = await this._prismaClient.$transaction([
      this._prismaClient.account.update({
        where: {
          id: accountId
        },
        data: {
          balance: {
            increment: amount
          }
        }
      }),
      this._prismaClient.income.create({
        data: {
          accountId,
          amount,
          source
        }
      })
    ]);
    return income;
  }
}
