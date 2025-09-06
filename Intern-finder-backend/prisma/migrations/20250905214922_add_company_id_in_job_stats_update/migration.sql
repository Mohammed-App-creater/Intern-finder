/*
  Warnings:

  - A unique constraint covering the columns `[companyId,day]` on the table `DailySummary` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."DailySummary_day_key";

-- CreateIndex
CREATE UNIQUE INDEX "DailySummary_companyId_day_key" ON "public"."DailySummary"("companyId", "day");
