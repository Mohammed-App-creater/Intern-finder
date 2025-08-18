-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "public"."JobStatus" AS ENUM ('live', 'closed');

-- CreateEnum
CREATE TYPE "public"."SalaryType" AS ENUM ('free', 'paid');

-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('pending', 'interview', 'accepted', 'rejected');

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "linkedinUrl" TEXT,
    "githubUrl" TEXT,
    "websiteUrl" TEXT,
    "foundedAt" TIMESTAMP(3),
    "employeeCount" TEXT,
    "locations" TEXT[],
    "industries" TEXT[],
    "logoUrl" TEXT,
    "description" TEXT,
    "techStack" TEXT[],
    "contact" TEXT,
    "images" TEXT[],
    "team" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Talent" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "languages" TEXT[],
    "linkedinUrl" TEXT,
    "githubUrl" TEXT,
    "otherSocialUrl" TEXT,
    "aboutMe" TEXT,
    "experiences" JSONB,
    "education" JSONB,
    "skills" TEXT[],
    "gender" "public"."Gender",
    "profilePicUrl" TEXT,
    "rating" DOUBLE PRECISION,
    "address" TEXT,
    "yearsExperience" INTEGER,
    "resumeUrl" TEXT,
    "availableForWork" BOOLEAN NOT NULL DEFAULT false,
    "settings" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Talent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Job" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "environmentType" TEXT NOT NULL,
    "categories" TEXT[],
    "salaryType" "public"."SalaryType" NOT NULL,
    "salaryRange" TEXT,
    "responsibilities" TEXT,
    "description" TEXT NOT NULL,
    "professionalSkills" TEXT,
    "tags" TEXT[],
    "minExperienceYears" INTEGER,
    "degree" TEXT,
    "location" TEXT NOT NULL,
    "status" "public"."JobStatus" NOT NULL DEFAULT 'live',
    "capacity" INTEGER,
    "requiredSkills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobApplication" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'pending',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyDashboardStats" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "newCandidates" INTEGER NOT NULL DEFAULT 0,
    "totalJobsPosted" INTEGER NOT NULL DEFAULT 0,
    "messagesReceived" INTEGER NOT NULL DEFAULT 0,
    "jobStatistics" JSONB,
    "openJobs" INTEGER NOT NULL DEFAULT 0,
    "applicantsSummary" JSONB,
    "jobUpdates" JSONB,

    CONSTRAINT "CompanyDashboardStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TalentDashboardStats" (
    "id" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "totalJobsApplied" INTEGER NOT NULL DEFAULT 0,
    "interviewCount" INTEGER NOT NULL DEFAULT 0,
    "jobsStatusSummary" JSONB,
    "upcomingInterview" JSONB,

    CONSTRAINT "TalentDashboardStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "public"."Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_email_key" ON "public"."Talent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyDashboardStats_companyId_key" ON "public"."CompanyDashboardStats"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "TalentDashboardStats_talentId_key" ON "public"."TalentDashboardStats"("talentId");

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobApplication" ADD CONSTRAINT "JobApplication_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "public"."Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyDashboardStats" ADD CONSTRAINT "CompanyDashboardStats_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TalentDashboardStats" ADD CONSTRAINT "TalentDashboardStats_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "public"."Talent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
