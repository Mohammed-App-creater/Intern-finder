-- CreateEnum
CREATE TYPE "public"."StatAction" AS ENUM ('VIEW', 'APPLIED');

-- CreateTable
CREATE TABLE "public"."JobStat" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "action" "public"."StatAction" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobStat_pkey" PRIMARY KEY ("id")
);
