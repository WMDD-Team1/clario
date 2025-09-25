import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger definition
const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Smart Docs API",
		version: "1.0.0",
		description: "API documentation for Smart Document & Finance Assistant",
	},
	servers: [
		{
			url: "http://localhost:3000",
		},
	],
};

//
const options = {
	swaggerDefinition,
	apis: ["./routes/*.js"],
};

const swagger = swaggerJSDoc(options);

export const setupSwagger = (app) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
};
