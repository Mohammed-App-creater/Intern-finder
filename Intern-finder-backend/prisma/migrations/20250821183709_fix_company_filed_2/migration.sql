-- AlterTable
ALTER TABLE "public"."Company" ALTER COLUMN "headQuarter" DROP NOT NULL,
ALTER COLUMN "headQuarter" SET DATA TYPE TEXT;
