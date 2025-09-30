import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Internship Platform API",
      version: "1.0.0",
      description: "API documentation for Internship Platform backend",
    },
    servers: [
      {
        url: "http://localhost:5000/api", // adjust your base path
        description: "Development server",
      },
      {
        url: "https://intern-finder-qom0.onrender.com/api",
        description: "Production server",
      },
      {
        url: "https://intern-finder-qom0.onrender.com/",
        description: "Production server without /api prefix",
      }
    ],
    tags: [
      { name: "Auth", description: "Authentication routes (talent/company login & register)" },
      { name: "Talent", description: "Talent user endpoints" },
      { name: "Job", description: "Job CRUD and listing endpoints" },
      { name: "Job Applications", description: "Apply and manage job applications" },
      { name: "Storage", description: "File upload endpoints" },
      { name: "Talent Dashboard", description: "Talent dashboard related endpoints" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ApplicationsListResponse: {
          type: "object",
          properties: {
            total: { type: "integer" },
            page: { type: "integer" },
            limit: { type: "integer" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/JobApplicationListItem" },
            },
          },
        },
        JobApplicationListItem: {
          type: "object",
          properties: {
            applicationId: { type: "string", format: "uuid" },
            appliedAt: { type: "string", format: "date-time" },
            status: { type: "string", enum: ["pending", "shortlisted", "interview", "offered", "accepted", "rejected"] },
            talent: { $ref: "#/components/schemas/Talent" },
            job: { type: "object", properties: { id: { type: "string", format: "uuid" }, title: { type: "string" } } },
          },
        },
        ApplicationDetails: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            job: { $ref: "#/components/schemas/Job" },
            talent: { $ref: "#/components/schemas/Talent" },
            status: { type: "string", enum: ["pending", "shortlisted", "interview", "offered", "accepted", "rejected"] },
            appliedAt: { type: "string", format: "date-time" },
            Interview: { type: "array", items: { type: "object", properties: { id: { type: "string" }, type: { type: "string" }, status: { type: "string" }, startTime: { type: "string", format: "date-time" } } } },
            feedbackScore: { type: ["number", "null"], nullable: true },
            _count: { type: "object", properties: { InterviewNote: { type: "integer" } } },
          },
        },
        UpdateApplicationStageRequest: {
          type: "object",
          properties: {
            stageKey: { type: "string", enum: ["pending", "shortlisted", "interview", "offered", "accepted", "rejected"] },
            reason: { type: "string" },
            notifyCandidate: { type: "boolean" },
          },
          required: ["stageKey"],
        },
        AddApplicationNoteRequest: {
          type: "object",
          properties: {
            content: { type: "string" },
            isPrivate: { type: "boolean" },
            parentId: { type: "string", format: "uuid" },
          },
          required: ["content"],
        },
        InterviewNote: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            applicationId: { type: "string", format: "uuid" },
            authorTalentId: { type: "string", format: "uuid", nullable: true },
            content: { type: "string" },
            isPrivate: { type: "boolean" },
            parentId: { type: "string", format: "uuid", nullable: true },
            replies: { type: "array", items: { $ref: "#/components/schemas/InterviewNote" } },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        NotesListResponse: {
          type: "object",
          properties: {
            notes: { type: "array", items: { $ref: "#/components/schemas/InterviewNote" } },
          },
        },
        Interview: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            companyId: { type: "string", format: "uuid" },
            applicationId: { type: "string", format: "uuid" },
            type: { type: "string", enum: ["PHONE", "WRITTEN", "SKILL", "FINAL", "ONSITE", "VIDEO"] },
            status: { type: "string", enum: ["SCHEDULED", "In_REVIEW", "COMPLETED", "CANCELLED"] },
            startTime: { type: "string", format: "date-time" },
            endTime: { type: "string", format: "date-time" },
            timezone: { type: "string" },
            locationType: { type: "string" },
            locationDetails: { type: "string" },
            externalCalendarEventId: { type: "string" },
            createdByCompanyId: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        InterviewCreateRequest: {
          type: "object",
          properties: {
            applicationId: { type: "string", format: "uuid" },
            type: { type: "string", enum: ["PHONE", "WRITTEN", "SKILL", "FINAL", "ONSITE", "VIDEO"] },
            startTime: { type: "string", format: "date-time" },
            endTime: { type: "string", format: "date-time" },
            timezone: { type: "string" },
            locationType: { type: "string" },
            locationDetails: { type: "string" },
            interviewerTalentIds: { type: "array", items: { type: "string", format: "uuid" } },
          },
          required: ["applicationId", "type", "startTime", "endTime"],
        },
        InterviewerAssignment: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            interviewId: { type: "string", format: "uuid" },
            talentId: { type: "string", format: "uuid" },
            role: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        InterviewFeedback: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            interviewId: { type: "string", format: "uuid" },
            interviewerId: { type: "string", format: "uuid" },
            rating: { type: "integer" },
            recommendation: { type: "string" },
            comments: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        InterviewListResponse: {
          type: "object",
          properties: {
            items: { type: "array", items: { $ref: "#/components/schemas/Interview" } },
            total: { type: "integer" },
            page: { type: "integer" },
            limit: { type: "integer" },
          },
        },
        CreateInterviewRequest: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["PHONE", "WRITTEN", "SKILL", "FINAL", "ONSITE", "VIDEO"] },
            startTime: { type: "string", format: "date-time" },
            endTime: { type: "string", format: "date-time" },
            timezone: { type: "string" },
            locationType: { type: "string" },
            locationDetails: { type: "string" },
            interviewerTalentIds: { type: "array", items: { type: "string", format: "uuid" } },
            notifyInterviewer: { type: "boolean" },
            moveApplicationToStage: { type: "boolean" },
          },
          required: ["type", "startTime", "endTime", "timezone", "locationType", "locationDetails", "interviewerTalentIds"],
        },
        UpdateInterviewRequest: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["PHONE", "WRITTEN", "SKILL", "FINAL", "ONSITE", "VIDEO"] },
            startTime: { type: "string", format: "date-time" },
            endTime: { type: "string", format: "date-time" },
            timezone: { type: "string" },
            locationType: { type: "string" },
            locationDetails: { type: "string" },
            interviewerTalentIds: { type: "array", items: { type: "string", format: "uuid" } },
            rescheduleReason: { type: "string" },
          },
        },
        UpdateInterviewStatusRequest: {
          type: "object",
          properties: {
            status: { type: "string", enum: ["SCHEDULED", "In_REVIEW", "COMPLETED", "CANCELLED"] },
            actualStartTime: { type: "string", format: "date-time" },
            actualEndTime: { type: "string", format: "date-time" },
            notes: { type: "string" },
          },
          required: ["status"],
        },
        DeleteInterviewRequest: {
          type: "object",
          properties: { reason: { type: "string" }, notifyCandidate: { type: "boolean" } },
        },
        AddAssignmentsRequest: {
          type: "object",
          properties: { talentIds: { type: "array", items: { type: "string", format: "uuid" } } },
          required: ["talentIds"],
        },
        FileResponse: {
          type: "object",
          properties: {
            url: { type: "string", format: "uri" },
          },
        },
        Job: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            companyId: { type: "string", format: "uuid" },
            title: { type: "string" },
            environmentType: { type: "string" },
            categories: { type: "array", items: { type: "string" } },
            salaryType: { type: "string", enum: ["free", "paid"] },
            minSalary: { type: "integer", nullable: true },
            maxSalary: { type: "integer", nullable: true },
            responsibilities: { type: "string", nullable: true },
            description: { type: "string" },
            professionalSkills: { type: "array", items: { type: "string" } },
            tags: { type: "array", items: { type: "string" } },
            minExperienceYears: { type: "integer", nullable: true },
            degree: { type: "string", nullable: true },
            location: { type: "string" },
            status: { type: "string", enum: ["live", "closed"] },
            capacity: { type: "integer", nullable: true },
            requiredSkills: { type: "array", items: { type: "string" } },
            viewCount: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Talent: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            fullName: { type: "string" },
            email: { type: "string", format: "email" },
            phoneNumber: { type: "string", nullable: true },
            profileImageUrl: { type: "string", format: "uri", nullable: true },
            resumeUrl: { type: "string", format: "uri", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: { type: "string" },
            user: { type: "object" },
          },
        },
        PaginationResponse: {
          type: "object",
          properties: {
            data: { type: "array", items: { type: "object" } },
            message: { type: "string" },
          },
        },
        JobApplication: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            jobId: { type: "string", format: "uuid" },
            talentId: { type: "string", format: "uuid" },
            status: {
              type: "string",
              enum: ["pending", "shortlisted", "interview", "offered", "accepted", "rejected"],
            },
            appliedAt: { type: "string", format: "date-time" },
            additionalInfo: {},
            resumeUrl: { type: "string", format: "uri", nullable: true },
            job: {
              type: "object",
              nullable: true,
              properties: {
                id: { type: "string", format: "uuid" },
                title: { type: "string" },
              },
            },
            talent: {
              type: "object",
              nullable: true,
              properties: {
                id: { type: "string", format: "uuid" },
                fullName: { type: "string" },
                email: { type: "string", format: "email" },
              },
            },
          },
          required: ["id", "jobId", "talentId", "status", "appliedAt"],
        },
        UpdateTalentSchema: {
          type: "object",
          description: "Partial update payload for a talent profile",
          properties: {
            fullName: { type: "string" },
            phoneNumber: { type: "string" },
            languages: { type: "array", items: { type: "string" } },
            linkedinUrl: { type: "string", format: "uri" },
            personalWebsite: { type: "string", format: "uri" },
            instagramUrl: { type: "string", format: "uri" },
            locations: { type: "string" },
            fieldOfStudy: { type: "string" },
            program: { type: "string" },
            workingEnvironment: { type: "string" },
            preferredRole: { type: "string" },
            bio: { type: "string" },
            aboutMe: { type: "string" },
            experiences: {},
            education: {},
            skills: { type: "array", items: { type: "string" } },
            gender: { type: "string", enum: ["male", "female", "other"] },
            profileImageUrl: { type: "string", format: "uri" },
            rating: { type: "number" },
            address: { type: "string" },
            yearsExperience: { type: "integer", format: "int32", minimum: 0 },
            resumeUrl: { type: "string", format: "uri" },
            availableForWork: { type: "boolean" },
            settings: {},
          },
          additionalProperties: false,
        },
      },
    },
  },
  apis: ["./src/modules/**/*.ts"], // Scan for JSDoc comments in your modules
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
