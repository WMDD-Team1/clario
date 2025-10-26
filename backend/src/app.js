import cors from "cors";
import express from "express";
import morgan from "morgan";
import "./jobs/recurrence.jobs.js";
import { router as authRoutes } from "./routes/auth/authRoutes.js";
import { router as clientRoutes } from "./routes/clients/clientsRoutes.js";
import { router as contractRoutes } from "./routes/contract/contractRoutes.js";
import { openaiRoutes, recurrencesRoutes, transactionRoutes } from "./routes/index.js";
import { router as invoiceRoutes } from "./routes/invoice/invoiceRoutes.js";
import { router as milestoneRoutes } from "./routes/projects/milestoneRoutes.js";
import { router as projectRoutes } from "./routes/projects/projectsRoutes.js";
import { router as settingRoutes } from "./routes/settings/settingRoutes.js";
import { setupSwagger } from "./swagger.js";

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
app.use("/api/projects", milestoneRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/ai", openaiRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/recurrences", recurrencesRoutes);

// Swagger
setupSwagger(app);
