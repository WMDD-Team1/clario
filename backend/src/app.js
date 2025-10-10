import express from "express";
import cors from "cors";
import morgan from "morgan";
import { setupSwagger } from "./swagger.js";
import { router as authRoutes } from "./routes/auth/authRoutes.js";
import { router as projectRoutes } from "./routes/projects/projectsRoutes.js";
import { router as clientRoutes } from "./routes/clients/clientsRoutes.js";
import { transactionRoutes } from "./routes/index.js";

export const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS only if CORS_ENABLED=true
if (process.env.CORS_ENABLED === "true") {
	app.use(cors({ origin: "http://localhost:5173" })); // for frontend in dev
}

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/transactions", transactionRoutes);

// Swagger
setupSwagger(app);
