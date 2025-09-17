import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { setupSwagger } from "./swagger.js";

// TEST
import testRoutes from "./routes/testRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// json, body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log
app.use(morgan("dev"));

// Enable CORS only if CORS_ENABLED=true
if (process.env.CORS_ENABLED === "true") {
	app.use(cors({ origin: "http://localhost:5173" })); // for frontend in dev
}

app.use("/api", testRoutes);

// Swagger
setupSwagger(app);

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
