import cors from "cors";
import express from "express";
import morgan from "morgan";
import "./jobs/recurrence.jobs.js";
import { router as authRoutes } from "./routes/auth/authRoutes.js";
import { router as clientRoutes } from "./routes/clients/clientsRoutes.js";
import { router as contractRoutes } from "./routes/contract/contractRoutes.js";
import { openaiRoutes, recurrencesRoutes, transactionRoutes } from "./routes/index.js";
import { router as invoiceRoutes } from "./routes/invoice/invoiceRoutes.js";
import { router as dashboardRoutes } from "./routes/dashboard/dashboardRoutes.js";
import { router as milestoneRoutes } from "./routes/projects/milestoneRoutes.js";
import { router as projectRoutes } from "./routes/projects/projectsRoutes.js";
import { router as settingRoutes } from "./routes/settings/settingRoutes.js";
import { router as contactRoutes } from "./routes/contact/contactRoutes.js";
import { setupSwagger } from "./swagger.js";
import "./utils/triggerInvoice.js";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";

export const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// Enable CORS only if CORS_ENABLED=true
if (process.env.CORS_ENABLED === "true") {
	app.use(cors({ origin: ["http://localhost:5173", "https://www.c-lario.com"], credentials: true })); // for frontend in dev
}

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/projects", milestoneRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/ai", openaiRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/recurrences", recurrencesRoutes);
app.use("/api/contact", contactRoutes);

// Swagger
setupSwagger(app);

app.get("/*path", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
