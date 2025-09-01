/*
  Warnings:

  - You are about to drop the column `profileImageId` on the `Talent` table. All the data in the column will be lost.
  - You are about to drop the column `resumeId` on the `Talent` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."File" DROP CONSTRAINT "File_talentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Talent" DROP CONSTRAINT "Talent_profileImageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Talent" DROP CONSTRAINT "Talent_resumeId_fkey";

-- DropIndex
DROP INDEX "public"."Talent_profileImageId_key";

-- DropIndex
DROP INDEX "public"."Talent_resumeId_key";

-- AlterTable
ALTER TABLE "public"."Talent" DROP COLUMN "profileImageId",
DROP COLUMN "resumeId",
ADD COLUMN     "profileImageUrl" TEXT,
ADD COLUMN     "resumeUrl" TEXT;

-- DropTable
DROP TABLE "public"."File";

-- DropEnum
DROP TYPE "public"."FileKind";
