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
              enum: ["pending", "interview", "accepted", "rejected"],
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
