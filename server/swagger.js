import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",

  info: {
    title: "TechLink API",
    version: "1.0.0",
    description:
      "API documentation for the TechLinkeed platform.",
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your access token",
      },
    },

    schemas: {
      Post: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "7c9f3d20-8a21-4b67-9d31-123456789abc",
          },
          imageUrl: {
            type: "string",
            example: "/uploads/posts/project.png",
          },
          caption: {
            type: "string",
            nullable: true,
            example: "My first TechLink project",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      Comment: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "comment-123",
          },
          content: {
            type: "string",
            example: "Great project!",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      Error: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Something went wrong",
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,

  apis: [
    "./Routes/**/*.js",
    "./routes/**/*.js",
    "./src/routes/**/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;