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
	tags: [
		{ name: "Auth", description: "Authentication and user identity management" },
		{ name: "Clients", description: "Client management and linked projects" },
		{ name: "Projects", description: "Projects, milestones, and deliverables" },
		{ name: "Contracts", description: "Contract upload, parsing, and AI risk analysis" },
		{ name: "Milestones", description: "Milestone creation, update, and progress tracking" },
		{ name: "Deliverables", description: "Deliverable uploads, updates, and file tracking" },
		{ name: "Invoices", description: "Invoice generation and payment tracking" },
		{ name: "Transactions", description: "Income and expense management" },
		{ name: "Recurrences", description: "Set recurrent expenses" },
		{ name: "Settings", description: "User preferences, categories, and system settings" },
		{ name: "OpenAI", description: "AI integrations — document extraction & clause analysis" },
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	},
	security: [{ bearerAuth: [] }],
};

//
const options = {
	swaggerDefinition,
	apis: ["./src/docs/**/*.js"],
};

const swagger = swaggerJSDoc(options);

export const setupSwagger = (app) => {
	app.use(
		"/api-docs",
		swaggerUi.serve,
		swaggerUi.setup(swagger, {
			explorer: true,
			customSiteTitle: "Clario API Docs",
			customCss: `
				.swagger-ui .topbar { display: none }
				.swagger-ui .info { margin-bottom: 2rem }
				.swagger-ui .scheme-container { margin-bottom: 2rem }
			`,
		})
	);

	console.log("Swagger documentation available at: http://localhost:3000/api-docs");
};
