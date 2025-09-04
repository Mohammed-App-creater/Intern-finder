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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
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
            settings: {}
          },
          additionalProperties: false
        }
      },
    },
  },
  apis: ["./src/modules/**/*.ts"], // Scan for JSDoc comments in your modules
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
