-- AlterTable
ALTER TABLE "public"."Talent" ADD COLUMN     "backgroundImageUrl" TEXT;

-- CreateTable
CREATE TABLE "public"."Settings" (
    "id" TEXT NOT NULL,
    "application" BOOLEAN NOT NULL DEFAULT true,
    "job" BOOLEAN NOT NULL DEFAULT true,
    "recommendation" BOOLEAN NOT NULL DEFAULT true,
    "alert" BOOLEAN NOT NULL DEFAULT true,
    "talentId" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_talentId_key" ON "public"."Settings"("talentId");

-- AddForeignKey
ALTER TABLE "public"."Settings" ADD CONSTRAINT "Settings_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "public"."Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
