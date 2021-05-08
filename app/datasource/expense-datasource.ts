import { PrismaClient } from "@prisma/client";
import PrismaDataSource from "./prisma-datasource";

export default class ExpenseDataSource extends PrismaDataSource {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient);
  }

  findAccountExpense(expenseId: number, accountId: number): any {
    return this._prismaClient.expense.findFirst({
      where: {
        id: expenseId,
        accountId: accountId
      }
    });
  }

  findAccountExpenses(accountId: number): any {
    return this._prismaClient.expense.findMany({
      where: {
        accountId
      }
    });
  }

  async create(
    accountId: number,
    amount: number,
    reason: string
  ): Promise<any> {
    const [_, expense] = await this._prismaClient.$transaction([
      this._prismaClient.account.update({
        where: {
          id: accountId
        },
        data: {
          balance: {
            decrement: amount
          }
        }
      }),
      this._prismaClient.expense.create({
        data: {
          accountId,
          amount,
          reason
        }
      })
    ]);
    return expense;
  }
}
