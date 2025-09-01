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
  },
  apis: ["./src/modules/**/*.ts"], // Scan for JSDoc comments in your modules
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
