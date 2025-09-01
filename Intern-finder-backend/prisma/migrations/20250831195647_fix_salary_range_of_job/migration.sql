/*
  Warnings:

  - You are about to drop the column `salaryRange` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "salaryRange",
ADD COLUMN     "maxSalary" TEXT,
ADD COLUMN     "minSalary" TEXT;
