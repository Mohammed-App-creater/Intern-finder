/*
  Warnings:

  - You are about to drop the column `otherSocialUrl` on the `Talent` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicUrl` on the `Talent` table. All the data in the column will be lost.
  - You are about to drop the column `resumeUrl` on the `Talent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileImageId]` on the table `Talent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resumeId]` on the table `Talent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."FileKind" AS ENUM ('PROFILE_IMAGE', 'CV');

-- AlterTable
ALTER TABLE "public"."Talent" DROP COLUMN "otherSocialUrl",
DROP COLUMN "profilePicUrl",
DROP COLUMN "resumeUrl",
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "locations" TEXT,
ADD COLUMN     "profileImageId" TEXT,
ADD COLUMN     "resumeId" TEXT;

-- CreateTable
CREATE TABLE "public"."File" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "kind" "public"."FileKind" NOT NULL,
    "uploaded" BOOLEAN NOT NULL DEFAULT false,
    "talentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "File_key_key" ON "public"."File"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_profileImageId_key" ON "public"."Talent"("profileImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_resumeId_key" ON "public"."Talent"("resumeId");

-- AddForeignKey
ALTER TABLE "public"."Talent" ADD CONSTRAINT "Talent_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "public"."File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Talent" ADD CONSTRAINT "Talent_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "public"."File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."File" ADD CONSTRAINT "File_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "public"."Talent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
