import express from "express";
import cors from "cors";
import morgan from "morgan";
import { setupSwagger } from "./swagger.js";
import { router as authRoutes } from "./routes/auth/auth.routes.js";

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

// Swagger
setupSwagger(app);