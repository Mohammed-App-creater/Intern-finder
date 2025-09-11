/*
  Warnings:

  - The values [IN_PROGRESS] on the enum `InterviewStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."InterviewStatus_new" AS ENUM ('SCHEDULED', 'In_REVIEW', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."Interview" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Interview" ALTER COLUMN "status" TYPE "public"."InterviewStatus_new" USING ("status"::text::"public"."InterviewStatus_new");
ALTER TYPE "public"."InterviewStatus" RENAME TO "InterviewStatus_old";
ALTER TYPE "public"."InterviewStatus_new" RENAME TO "InterviewStatus";
DROP TYPE "public"."InterviewStatus_old";
ALTER TABLE "public"."Interview" ALTER COLUMN "status" SET DEFAULT 'In_REVIEW';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Interview" ALTER COLUMN "status" SET DEFAULT 'In_REVIEW';
