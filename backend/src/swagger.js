import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger definition
const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Clario API docs",
		version: "1.0.0",
		description: "API docs for Clario",
	},
	servers: [
		{
			url: "http://localhost:3000",
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
			// Request
			Signup: {
				type: "object",
				properties: {
					email: { type: "string", example: "test@example.com" },
					name: { type: "string", example: "Bitna" },
					userType: {
						type: "string",
						enum: ["Freelancer", "Contractor"],
						example: "Freelancer",
					},
					profileImage: { type: "string", example: "https://example.com/avatar.png" },
					province: { type: "string", example: "BC" },
					currency: { type: "string", default: "CAD" },
					onBoardingCompletedAt: {
						type: "string",
						format: "date-time",
						nullable: true,
						example: null,
					},
				},
				required: ["email", "name", "userType"],
			},

			// Return
			User: {
				type: "object",
				properties: {
					id: { type: "string", example: "650d1e4f5d1234567890abcd" },
					email: { type: "string", example: "test@example.com" },
					name: { type: "string", example: "Bitna" },
					userType: { type: "string", example: "Freelancer" },
					profileImage: { type: "string", example: "https://example.com/avatar.png" },
					province: { type: "string", example: "BC" },
					currency: { type: "string", example: "CAD" },
					onBoardingCompletedAt: {
						type: "string",
						format: "date-time",
						nullable: true,
						example: null,
					},
					createdAt: {
						type: "string",
						format: "date-time",
						example: "2025-09-25T12:34:56.000Z",
					},
					updatedAt: {
						type: "string",
						format: "date-time",
						example: "2025-09-25T12:34:56.000Z",
					},
				},
			},
		},
	},
};

//
const options = {
	swaggerDefinition,
	apis: ["./src/routes/**/*.js"],
};

const swagger = swaggerJSDoc(options);

export const setupSwagger = (app) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
};
