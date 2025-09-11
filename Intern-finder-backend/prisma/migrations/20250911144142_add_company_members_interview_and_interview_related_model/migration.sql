-- CreateEnum
CREATE TYPE "public"."InterviewStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."InterviewType" AS ENUM ('PHONE', 'WRITTEN', 'SKILL', 'FINAL', 'ONSITE', 'VIDEO');

-- CreateTable
CREATE TABLE "public"."CompanyMember" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "role" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Interview" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "type" "public"."InterviewType" NOT NULL,
    "status" "public"."InterviewStatus" NOT NULL DEFAULT 'SCHEDULED',
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT,
    "locationType" TEXT,
    "locationDetails" TEXT,
    "externalCalendarEventId" TEXT,
    "createdByCompanyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InterviewerAssignment" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewerAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InterviewFeedback" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "interviewerId" TEXT NOT NULL,
    "rating" INTEGER,
    "recommendation" TEXT,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InterviewNote" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT,
    "applicationId" TEXT,
    "authorTalentId" TEXT,
    "content" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT true,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMember_companyId_talentId_key" ON "public"."CompanyMember"("companyId", "talentId");

-- CreateIndex
CREATE INDEX "Interview_companyId_idx" ON "public"."Interview"("companyId");

-- CreateIndex
CREATE INDEX "Interview_applicationId_idx" ON "public"."Interview"("applicationId");

-- CreateIndex
CREATE INDEX "Interview_startTime_endTime_idx" ON "public"."Interview"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "InterviewerAssignment_talentId_idx" ON "public"."InterviewerAssignment"("talentId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewerAssignment_interviewId_talentId_key" ON "public"."InterviewerAssignment"("interviewId", "talentId");

-- CreateIndex
CREATE INDEX "InterviewNote_authorTalentId_idx" ON "public"."InterviewNote"("authorTalentId");

-- AddForeignKey
ALTER TABLE "public"."CompanyMember" ADD CONSTRAINT "CompanyMember_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyMember" ADD CONSTRAINT "CompanyMember_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "public"."Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Interview" ADD CONSTRAINT "Interview_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Interview" ADD CONSTRAINT "Interview_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."JobApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewerAssignment" ADD CONSTRAINT "InterviewerAssignment_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "public"."Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewerAssignment" ADD CONSTRAINT "InterviewerAssignment_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "public"."Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewFeedback" ADD CONSTRAINT "InterviewFeedback_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "public"."Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewFeedback" ADD CONSTRAINT "InterviewFeedback_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "public"."Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewNote" ADD CONSTRAINT "InterviewNote_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "public"."Interview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewNote" ADD CONSTRAINT "InterviewNote_authorTalentId_fkey" FOREIGN KEY ("authorTalentId") REFERENCES "public"."Talent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewNote" ADD CONSTRAINT "InterviewNote_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."InterviewNote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
