import { DataSource } from "apollo-datasource";
import { PrismaClient } from "@prisma/client";

export default abstract class PrismaDataSource extends DataSource {
  protected _prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    super();
    this._prismaClient = prismaClient;
  }
}
