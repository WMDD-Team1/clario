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
	},
};

//
const options = {
	swaggerDefinition,
	apis: ["./src/docs/**/*.js"],
};

const swagger = swaggerJSDoc(options);

// console.log(swagger.components?.schemas);
export const setupSwagger = (app) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
};