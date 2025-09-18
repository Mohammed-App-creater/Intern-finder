/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "public"."Talent" ADD COLUMN     "birthday" TIMESTAMP(3),
ALTER COLUMN "rating" SET DEFAULT 0.0;
