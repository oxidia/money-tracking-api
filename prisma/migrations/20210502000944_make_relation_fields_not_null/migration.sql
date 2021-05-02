/*
  Warnings:

  - Made the column `userId` on table `accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountId` on table `expenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountId` on table `incomes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "expenses" ALTER COLUMN "accountId" SET NOT NULL;

-- AlterTable
ALTER TABLE "incomes" ALTER COLUMN "accountId" SET NOT NULL;
