/*
  Warnings:

  - The `maxSalary` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `minSalary` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "maxSalary",
ADD COLUMN     "maxSalary" INTEGER,
DROP COLUMN "minSalary",
ADD COLUMN     "minSalary" INTEGER;
