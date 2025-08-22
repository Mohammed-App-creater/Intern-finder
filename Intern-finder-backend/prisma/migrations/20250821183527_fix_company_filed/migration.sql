/*
  Warnings:

  - You are about to drop the column `contact` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `locations` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "contact",
DROP COLUMN "githubUrl",
DROP COLUMN "locations",
ADD COLUMN     "branches" TEXT[],
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactJobTitle" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "headQuarter" TEXT[],
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "organizationType" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "teamSize" TEXT,
ADD COLUMN     "workEnvironment" TEXT;
