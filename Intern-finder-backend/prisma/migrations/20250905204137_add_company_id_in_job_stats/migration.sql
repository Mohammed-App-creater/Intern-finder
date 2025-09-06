/*
  Warnings:

  - Added the required column `companyId` to the `DailySummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `JobStat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."DailySummary" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."JobStat" ADD COLUMN     "companyId" TEXT NOT NULL;
